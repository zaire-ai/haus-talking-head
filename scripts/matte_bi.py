"""Clean matte with BiRefNet-portrait on the GPU (hair-accurate, no wall halo) + chair suppression.
usage: python matte_bi.py src.mp4 bg.png out.mp4            (full; mask on every 2nd frame, in-betweens blended)
       python matte_bi.py src.mp4 bg.png x 2.8,18,68.5      (test frames -> snaps/bi_<t>.jpg)
Needs onnxruntime-gpu[cuda,cudnn] (RTX 3060: ~1.6 s per mask)."""
import onnxruntime as ort; ort.preload_dlls()
import subprocess, sys, os, time, numpy as np, cv2
SRC, BG, OUT = sys.argv[1:4]
TEST = [float(x) for x in sys.argv[4].split(",")] if len(sys.argv) > 4 else None
W, H = 1920, 1080
bg = cv2.resize(cv2.imread(BG), (W, H), interpolation=cv2.INTER_CUBIC).astype(np.float32)
MODEL = os.path.expanduser(r"~\.rembg\models\birefnet-portrait\birefnet-portrait.onnx")
sess = ort.InferenceSession(MODEL, providers=[("CUDAExecutionProvider", {"cudnn_conv_algo_search": "HEURISTIC"}), "CPUExecutionProvider"])
IN = sess.get_inputs()[0].name
MEAN = np.array([0.485, 0.456, 0.406], np.float32); STD = np.array([0.229, 0.224, 0.225], np.float32)
CHAIR = np.zeros((H, W), bool); CHAIR[760:1080, 1200:1520] = True; CHAIR[820:1080, 380:560] = True

def mask(f):
    x = cv2.resize(f, (1024, 1024), interpolation=cv2.INTER_AREA)[..., ::-1].astype(np.float32) / 255
    x = ((x - MEAN) / STD).transpose(2, 0, 1)[None]
    y = sess.run(None, {IN: np.ascontiguousarray(x)})[0][0, 0]
    y = 1 / (1 + np.exp(-y))
    return cv2.resize(y.astype(np.float32), (W, H), interpolation=cv2.INTER_LINEAR)

def finish(f, m):
    hs = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    chairpx = CHAIR & (hs[..., 2] > 40) & (hs[..., 2] < 175) & (hs[..., 1] < 70)
    m = m * (1.0 - cv2.GaussianBlur(chairpx.astype(np.float32), (0, 0), 3))
    m3 = np.clip(m, 0, 1)[..., None]
    return (f * m3 + bg * (1 - m3)).astype(np.uint8)

if TEST:
    for t in TEST:
        raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(t), "-i", SRC, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], capture_output=True).stdout
        f = np.frombuffer(raw, np.uint8).reshape(H, W, 3)
        cv2.imwrite(f"snaps/bi_{t}.jpg", finish(f, mask(f)))
    sys.exit()

rd = subprocess.Popen(["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-",
                       "-i", SRC, "-map", "0:v", "-map", "1:a", "-c:a", "copy", "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-pix_fmt", "yuv420p", "-shortest", OUT], stdin=subprocess.PIPE)
n = 0; t0 = time.time(); pm = None; pending = None   # pending = odd frame waiting for the next mask
while True:
    b = rd.stdout.read(W * H * 3)
    if len(b) < W * H * 3: break
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3)
    if n % 2 == 0:
        m = mask(f)
        if pending is not None: wr.stdin.write(finish(pending, 0.5 * (pm + m)).tobytes())
        wr.stdin.write(finish(f, m).tobytes()); pm = m; pending = None
    else:
        pending = f
    n += 1
    if n % 100 == 0: print(n, round(n / (time.time() - t0), 2), "fps", flush=True)
if pending is not None: wr.stdin.write(finish(pending, pm).tobytes())
wr.stdin.close(); wr.wait(); print("DONE", n, flush=True)
