"""Remove the grey chair that CapCut Remove BG leaves behind Melissa's shoulder, from the CapCut export.
usage: python chair_clean.py capcut_export.mp4 bg.png out.mp4            (full video, keeps audio)
       python chair_clean.py capcut_export.mp4 bg.png x 9,18,60,120     (test frames -> snaps/cc_<t>.jpg)
How: the background image is known, so inside two fixed zones (her lower-left and lower-right, where the chair
shows) any chair-grey pixel (low saturation, mid brightness) that differs from the background is replaced by the
background. Her blazer (bright), hair (very dark) and skin (warm/saturated) are left alone. Re-check the zones with
test frames if the camera framing changes. Fast (CPU, ~15-25 fps), no AI model.
"""
import subprocess, sys, os, numpy as np, cv2
SRC, BG, OUT = sys.argv[1:4]
TEST = [float(x) for x in sys.argv[4].split(",")] if len(sys.argv) > 4 else None
W, H = 1920, 1080
bg = cv2.resize(cv2.imread(BG), (W, H), interpolation=cv2.INTER_CUBIC)
bgf = bg.astype(np.float32)
ZONE = np.zeros((H, W), bool); ZONE[760:1080, 1200:1520] = True; ZONE[820:1080, 380:560] = True

def clean(f):
    hs = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    diff = np.abs(f.astype(np.int16) - bg.astype(np.int16)).sum(-1) > 40
    # CapCut's export shows the chair as a DARK grey (V ~70-110); her blazer shadows on the sleeve edge are brighter
    # pink-grey (V > ~115). Swapping those shadows for the (dark table) background made dark notches on her sleeves
    # (user saw them 2026-11-18), so: dark only, and only big connected areas (small dark bits like the "dji" text on
    # the mic and stray shadow specks are left alone).
    chair = ZONE & diff & (hs[..., 1] < 70) & (hs[..., 2] > 40) & (hs[..., 2] < 112)
    chair = cv2.morphologyEx(chair.astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(chair)
    keep = np.zeros(n, np.uint8); keep[1:] = st[1:, cv2.CC_STAT_AREA] >= 1500
    chair = keep[lab]
    chair = cv2.dilate(chair, np.ones((5, 5), np.uint8))
    a = cv2.GaussianBlur(chair.astype(np.float32), (0, 0), 2.5)[..., None]
    return (f * (1 - a) + bgf * a).astype(np.uint8)

if TEST:
    os.makedirs("snaps", exist_ok=True)
    for t in TEST:
        raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(t), "-i", SRC, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-"], capture_output=True).stdout
        f = np.frombuffer(raw, np.uint8).reshape(H, W, 3)
        cv2.imwrite(f"snaps/cc_{t}.jpg", np.hstack([f, clean(f)])[::2, ::2])
    sys.exit()
rd = subprocess.Popen(["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-",
                       "-i", SRC, "-map", "0:v", "-map", "1:a?", "-c:a", "copy", "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-pix_fmt", "yuv420p", "-shortest", OUT], stdin=subprocess.PIPE)
n = 0
while True:
    b = rd.stdout.read(W * H * 3)
    if len(b) < W * H * 3: break
    wr.stdin.write(clean(np.frombuffer(b, np.uint8).reshape(H, W, 3)).tobytes()); n += 1
    if n % 500 == 0: print(n, flush=True)
wr.stdin.close(); wr.wait(); print("DONE", n)
