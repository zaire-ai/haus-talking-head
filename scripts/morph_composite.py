"""Drop the matted footage into the split-screen window with the approved 0.7 s morph:
full-frame shot shrinks into the framed window (in) and grows back to full frame (out).
usage: python morph_composite.py <pops.mov> <matted.mp4> <segs.json> <out.mov> <duration_s>
The pops overlay must leave the window transparent (the template's 4 cream rects around WIN).
Output: ProRes 4444 with alpha + the overlay's SFX audio. Always give it a NEW filename (CapCut caches by path).
"""
import subprocess, sys, json, numpy as np, cv2
POPS, MAT, SEGF, OUT, DUR = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], float(sys.argv[5])
H, W, FPS = 1080, 1920, 30000 / 1001
SEGS = json.load(open(SEGF)); M = 0.7; WIN = (1100, 80, 700, 920)
N = int(round(DUR * FPS)); ease = lambda x: x * x * (3 - 2 * x)
def p_at(t):
    for a, b in SEGS:
        if a <= t < b:
            if t < a + M: return ease((t - a) / M)
            if t > b - M: return ease((b - t) / M)
            return 1.0
rp = subprocess.Popen(["ffmpeg", "-v", "error", "-i", POPS, "-f", "rawvideo", "-pix_fmt", "rgba", "-"], stdout=subprocess.PIPE)
rm = subprocess.Popen(["ffmpeg", "-v", "error", "-i", MAT, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-",
                       "-i", POPS, "-map", "0:v", "-map", "1:a", "-c:v", "prores_ks", "-profile:v", "4444", "-qscale:v", __import__("os").environ.get("PRORES_Q", "4"),
                       "-pix_fmt", "yuva444p10le", "-alpha_bits", "8", "-vendor", "apl0", "-c:a", "pcm_s16le", "-shortest", OUT], stdin=subprocess.PIPE)
for n in range(N):
    bp = rp.stdout.read(W * H * 4); bm = rm.stdout.read(W * H * 3)
    if len(bp) < W * H * 4: break
    top = np.frombuffer(bp, np.uint8).reshape(H, W, 4); p = p_at(n / FPS)
    if p is None or len(bm) < W * H * 3: wr.stdin.write(top.tobytes()); continue
    src = np.frombuffer(bm, np.uint8).reshape(H, W, 3)
    x0, y0 = WIN[0] * p, WIN[1] * p; w = W + (WIN[2] - W) * p; h = H + (WIN[3] - H) * p
    s = 1 + (WIN[3] / H - 1) * p; cx = (W * s - WIN[2]) / 2 * p; sx = cx / s
    crop = src[0:int(h / s), int(sx):int(sx + w / s)]
    win = cv2.resize(crop, (max(1, int(round(w))), max(1, int(round(h)))), interpolation=cv2.INTER_AREA if s < 1 else cv2.INTER_LINEAR)
    X, Y = int(round(x0)), int(round(y0)); win = win[: H - Y, : W - X]
    layer = np.zeros((H, W, 4), np.uint8); layer[Y:Y + win.shape[0], X:X + win.shape[1], :3] = win; layer[Y:Y + win.shape[0], X:X + win.shape[1], 3] = 255
    a = top[..., 3:4].astype(np.float32) / 255
    rgb = top[..., :3] * a + layer[..., :3] * (1 - a); alpha = np.maximum(top[..., 3], layer[..., 3])
    if p < 1.0: rgb = np.where(layer[..., 3:4] > 0, layer[..., :3], rgb)   # moving shot above the page: no ghosting
    wr.stdin.write(np.dstack([rgb.astype(np.uint8), alpha]).tobytes())
wr.stdin.close(); wr.wait(); print("DONE")
