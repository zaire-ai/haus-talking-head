"""Bake the dead-air / retake cut into a new clip.
usage: python cut.py <raw.mp4> <keep.json> <out.mp4>
keep.json = [[start, end], ...] source-time ranges to KEEP (chosen from the transcript: best take of each line,
never a stumble, never her reaching to start/stop the camera). Inside each range, silences > 0.3 s are tightened
to ~0.18 s. Re-encodes once (x264 CRF 14) with 12 ms audio fades at every join so nothing clicks.
"""
import re, subprocess, json, sys
SRC, KEEP_F, OUT = sys.argv[1:4]
KEEP = json.load(open(KEEP_F))
PAD = 0.09
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", SRC, "-vn", "-af", "silencedetect=noise=-38dB:d=0.3", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
sil = list(zip(ss, se[:len(ss)]))
segs = []
for a, b in KEEP:
    cur = a
    for s, e in sil:
        if s > cur + 0.2 and e < b - 0.1 and e - s > 0.3:
            segs.append((cur, s + PAD)); cur = e - PAD
    segs.append((cur, b))
segs = [(round(a, 3), round(b, 3)) for a, b in segs if b - a > 0.12]
json.dump(segs, open(OUT + ".segs.json", "w"))
fc = "".join(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,"
             f"afade=t=out:st={round(b - a - 0.012, 3)}:d=0.012[a{i}];" for i, (a, b) in enumerate(segs))
fc += "".join(f"[v{i}][a{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=1[v][a]"
open(OUT + ".fc.txt", "w").write(fc)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", SRC, "-/filter_complex", OUT + ".fc.txt", "-map", "[v]", "-map", "[a]",
                "-c:v", "libx264", "-crf", "14", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", "30000/1001",
                "-c:a", "aac", "-b:a", "256k", OUT], check=True)
print(f"{len(segs)} segments, {sum(b - a for a, b in segs):.1f}s -> {OUT}")
