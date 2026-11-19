"""Cut Melissa out (rembg u2net_human_seg) over the brand background, ONLY for the split-screen window segments.
usage: python matte_segments.py <cut.mp4> <background.png> <segs.json> <out.mp4>
segs.json = [[start, end], ...] split-screen segments (cut time). Frames outside are written black.
~2-3 fps on CPU, so ~43 s of segments takes ~10 min: run it in the background.
"""
import subprocess, sys, json, time, numpy as np, cv2
from rembg import new_session, remove
SRC, BG, SEGF, OUT = sys.argv[1:5]
SEGS = [(a - 0.15, b + 0.15) for a, b in json.load(open(SEGF))]
W, H, FPS = 1920, 1080, 30000 / 1001
bg = cv2.resize(cv2.imread(BG), (W, H), interpolation=cv2.INTER_CUBIC).astype(np.float32)
s = new_session("u2net_human_seg")
rd = subprocess.Popen(["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-",
                       "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-pix_fmt", "yuv420p", OUT], stdin=subprocess.PIPE)
black = np.zeros((H, W, 3), np.uint8).tobytes()
n = done = 0; prev = None; t0 = time.time()
while True:
    b = rd.stdout.read(W * H * 3)
    if len(b) < W * H * 3: break
    t = n / FPS; n += 1
    if not any(a <= t <= e for a, e in SEGS):
        wr.stdin.write(black); prev = None; continue
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3)
    m = remove(cv2.cvtColor(cv2.resize(f, (960, 540)), cv2.COLOR_BGR2RGB), session=s, only_mask=True)
    m = cv2.resize(m, (W, H)).astype(np.float32) / 255
    m = np.clip((m - 0.3) / 0.5, 0, 1); m = cv2.erode(m, np.ones((3, 3), np.uint8)); m = cv2.GaussianBlur(m, (0, 0), 1.4)
    if prev is not None: m = 0.6 * m + 0.4 * prev
    prev = m; m3 = m[..., None]
    wr.stdin.write((f * m3 + bg * (1 - m3)).astype(np.uint8).tobytes()); done += 1
    if done % 100 == 0: print(done, round(done / (time.time() - t0), 2), "fps", flush=True)
wr.stdin.close(); wr.wait(); print("DONE", done)
