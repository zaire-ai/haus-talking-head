"""Restore the ORIGINAL camera detail inside the speaker after CapCut background removal.
usage: python sharpen_restore.py <raw.mp4> <capcut_nobg.mp4> <bg.png> <out.mp4>
Why: CapCut's Remove BG AI smooths skin and hair (detail visibly lost vs the raw, even at 1080p / high bitrate).
How: the person matte is |nobg - bg|, further limited to pixels where raw ~= nobg (so the real room wall can never leak in
as a grey halo next to the hair; seen on the Welcome video 2026-11-17) (the brand background is a known still). The matte is eroded and feathered
into a "core"; out = raw * core + nobg * (1 - core). So the inside of the person is the untouched raw footage
and only the outer edge (hair outline, shoulders) keeps CapCut's cut-out. The CapCut export is resampled to the raw's frame rate by time (CapCut exports 30 fps while the camera shot 29.97 fps; pairing frames one by one
drifted ~9 frames by the end and put the room wall next to the hair as a grey halo, Welcome video 2026-11-17). Output x264 CRF 12, source fps, raw audio.
"""
import subprocess, sys, json, numpy as np, cv2
RAW, NOBG, BG, OUT = sys.argv[1:5]
W, H = 1920, 1080
fps = json.loads(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
                                 "-of", "json", RAW], capture_output=True, text=True).stdout)["streams"][0]["r_frame_rate"]
bg = cv2.resize(cv2.imread(BG), (W, H), interpolation=cv2.INTER_CUBIC).astype(np.int16)
ERODE = np.ones((15, 15), np.uint8)

def core(f):
    d = np.abs(f.astype(np.int16) - bg).max(-1)
    m = (d > 22).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    if n < 2: return np.zeros((H, W, 1), np.float32)
    m = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((31, 31), np.uint8))
    ff = m.copy(); cv2.floodFill(ff, np.zeros((H + 2, W + 2), np.uint8), (0, 0), 1)
    m = cv2.erode(m | (1 - ff), ERODE)                  # fill holes, pull in from the edge
    return cv2.GaussianBlur(m.astype(np.float32), (0, 0), 4)[..., None]

rr = subprocess.Popen(["ffmpeg", "-v", "error", "-i", RAW, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
rn = subprocess.Popen(["ffmpeg", "-v", "error", "-i", NOBG, "-vf", f"fps={fps}", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", fps, "-i", "-",
                       "-i", RAW, "-map", "0:v", "-map", "1:a?", "-c:a", "copy", "-c:v", "libx264", "-crf", "12", "-preset", "medium",
                       "-pix_fmt", "yuv420p", "-shortest", OUT], stdin=subprocess.PIPE)
n = 0
while True:
    a = rr.stdout.read(W * H * 3); b = rn.stdout.read(W * H * 3)
    if len(a) < W * H * 3 or len(b) < W * H * 3: break
    raw = np.frombuffer(a, np.uint8).reshape(H, W, 3).astype(np.float32)
    nb = np.frombuffer(b, np.uint8).reshape(H, W, 3)
    c = core(nb)
    # only take raw pixels where CapCut actually kept the person: there raw and nobg look alike (only softened);
    # in a halo band CapCut shows the brand bg while the raw shows the real room wall, so they differ a lot.
    same = (cv2.GaussianBlur(np.abs(raw - nb).max(-1), (0, 0), 2) < 28).astype(np.uint8)
    same = cv2.erode(same, np.ones((7, 7), np.uint8))
    c = c * cv2.GaussianBlur(same.astype(np.float32), (0, 0), 3)[..., None]
    wr.stdin.write((raw * c + nb * (1 - c)).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print("DONE", n)
