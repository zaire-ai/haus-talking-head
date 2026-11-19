"""Full-length clean matte: Melissa over the brand background, with the grey chair behind her shoulder removed.
Replaces CapCut Auto removal (which keeps the chair and goes stale/ghosts when the clip file is swapped).
usage:
  test frames:  python matte_clean.py cut.mp4 bg.png x 9,18,60,120      -> snaps/mt_<t>.jpg (check the chair is gone)
  full render:  python matte_clean.py cut.mp4 bg.png out.mp4
  one chunk:    python matte_clean.py cut.mp4 bg.png out_c0.mp4 - <start_s> <dur_s>   (no audio; concat chunks + add audio)
Chair zones are fixed boxes for Melissa's usual framing (960x540 coords in _plate()): re-check with test frames if the
camera moved. ~1.3 fps single / ~1.5 fps total with 3 parallel chunks. Run chunks DETACHED (a .bat per chunk launched
with PowerShell Start-Process, background image copied into the project as bg.png - paths with spaces break the args),
so they survive a paused session.
"""
import subprocess, sys, numpy as np, cv2, time
from rembg import new_session, remove
SRC, BG, OUT = sys.argv[1:4]; TEST = [float(x) for x in sys.argv[4].split(",")] if len(sys.argv) > 4 and sys.argv[4] != "-" else None
SS, TT = (float(sys.argv[5]), float(sys.argv[6])) if len(sys.argv) > 6 else (0, 0)
W, H, FPS = 1920, 1080, 30000 / 1001
bg = cv2.resize(cv2.imread(BG), (W, H), interpolation=cv2.INTER_CUBIC).astype(np.float32)
s = new_session("u2net_human_seg")
# clean plate of the static room: per-pixel median of pixels rembg calls background in sampled frames
def _plate():
    n = 72; dur = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",SRC],capture_output=True,text=True).stdout)
    acc = []; msk = []
    for i in range(n):
        t = 1 + i * (dur - 2) / n
        raw = subprocess.run(["ffmpeg","-v","error","-ss",str(t),"-i",SRC,"-frames:v","1","-f","rawvideo","-pix_fmt","bgr24","-s","960x540","-"],capture_output=True).stdout
        f = np.frombuffer(raw, np.uint8).reshape(540, 960, 3)
        acc.append(f)
    P = np.median(np.stack(acc), axis=0).astype(np.float32)
    chair = np.zeros((540, 960), bool); chair[380:540, 600:760] = True; chair[410:540, 190:280] = True
    return P, chair
PLATE, PVALID = _plate()
print("plate ready", PVALID.mean(), flush=True)
def matte(f, prev):
    m = remove(cv2.cvtColor(cv2.resize(f, (960, 540)), cv2.COLOR_BGR2RGB), session=s, only_mask=True).astype(np.float32) / 255
    small = cv2.resize(f, (960, 540)).astype(np.float32)
    hs = cv2.cvtColor(small.astype(np.uint8), cv2.COLOR_BGR2HSV)
    chairpx = PVALID & (hs[..., 2] > 40) & (hs[..., 2] < 175) & (hs[..., 1] < 70)
    fg = 1.0 - cv2.GaussianBlur(chairpx.astype(np.float32), (0, 0), 1.5)
    m = np.clip((m - 0.3) / 0.5, 0, 1) * fg
    m = cv2.resize(m, (W, H))
    m = cv2.erode(m, np.ones((5, 5), np.uint8)); m = cv2.GaussianBlur(m, (0, 0), 1.6)
    if prev is not None: m = 0.6 * m + 0.4 * prev
    return m
if TEST:
    for t in TEST:
        f = cv2.imread(f"t_{t}.png") if False else None
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(t), "-i", SRC, "-frames:v", "1", "_t.png"])
        f = cv2.imread("_t.png"); m = matte(f, None)[..., None]
        cv2.imwrite(f"snaps/mt_{t}.jpg", (f * m + bg * (1 - m)).astype(np.uint8))
    sys.exit()
rd = subprocess.Popen(["ffmpeg", "-v", "error"] + (["-ss", str(SS), "-t", str(TT)] if TT else []) + ["-i", SRC, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-",
                       "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-pix_fmt", "yuv420p", OUT], stdin=subprocess.PIPE)
prev = None; n = 0; t0 = time.time()
while True:
    b = rd.stdout.read(W * H * 3)
    if len(b) < W * H * 3: break
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3); prev = matte(f, prev); m3 = prev[..., None]
    wr.stdin.write((f * m3 + bg * (1 - m3)).astype(np.uint8).tobytes()); n += 1
    if n % 100 == 0: print(n, round(n / (time.time() - t0), 2), "fps", flush=True)
wr.stdin.close(); wr.wait(); print("DONE", n)
