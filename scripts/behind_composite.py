"""Put a transparent HyperFrames layer BEHIND the speaker (between the room and her), baked into the A-roll.
usage: python behind_composite.py <cut.mp4> <bg.png> <behind.mov> <out.mp4>
How: the cut already has the brand background baked in, and that background is a known still image, so the
person matte is simply |frame - bg| (difference ~2 on the room vs ~130 on her). The matte is cleaned (open,
largest blob, close, enclosed holes filled: her cream blazer is close to the cream room) and feathered, then
    out = frame * person + (behind layer over frame) * (1 - person)
so words/cards drawn in behind.mov sit behind her head and shoulders. Keep behind-layer content at head height
or above (y < ~700 on 1080p): the matte is weakest on the lower blazer. Output x264 CRF 14 with the cut's audio.
"""
import subprocess, sys, numpy as np, cv2
CUT, BG, BEH, OUT = sys.argv[1:5]
W, H = 1920, 1080
bg = cv2.resize(cv2.imread(BG), (W, H), interpolation=cv2.INTER_CUBIC).astype(np.int16)

def person(f):
    d = np.abs(f.astype(np.int16) - bg).max(-1).astype(np.float32)
    m = (np.clip((d - 14) / 16, 0, 1) > 0.5).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    if n < 2: return np.zeros((H, W), np.float32)
    m = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((31, 31), np.uint8))
    ff = m.copy(); cv2.floodFill(ff, np.zeros((H + 2, W + 2), np.uint8), (0, 0), 1)
    m = m | (1 - ff)                                   # fill enclosed holes
    return cv2.GaussianBlur(m.astype(np.float32), (0, 0), 1.6)

rc = subprocess.Popen(["ffmpeg", "-v", "error", "-i", CUT, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
rb = subprocess.Popen(["ffmpeg", "-v", "error", "-i", BEH, "-f", "rawvideo", "-pix_fmt", "bgra", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-",
                       "-i", CUT, "-map", "0:v", "-map", "1:a?", "-c:a", "copy", "-c:v", "libx264", "-crf", "14", "-preset", "medium",
                       "-pix_fmt", "yuv420p", "-shortest", OUT], stdin=subprocess.PIPE)
n = 0
while True:
    bc = rc.stdout.read(W * H * 3)
    if len(bc) < W * H * 3: break
    bb = rb.stdout.read(W * H * 4)
    f = np.frombuffer(bc, np.uint8).reshape(H, W, 3)
    if len(bb) < W * H * 4: wr.stdin.write(f.tobytes()); continue
    L = np.frombuffer(bb, np.uint8).reshape(H, W, 4).astype(np.float32)
    a = L[..., 3:4] / 255
    if a.max() == 0: wr.stdin.write(f.tobytes()); n += 1; continue
    p = person(f)[..., None]
    room = f * (1 - a) + L[..., :3] * a
    wr.stdin.write((f * p + room * (1 - p)).astype(np.uint8).tobytes()); n += 1
wr.stdin.close(); wr.wait(); print("DONE", n)
