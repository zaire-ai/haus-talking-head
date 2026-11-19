"""Bake full-frame B-roll slots INTO the morphed overlay with soft alpha dissolves (approved 2026-11-13: no hard cuts).
usage: python blend_slots.py <overlay_morphed.mov> <out.mov> <duration> slot.mp4@start [slot.mp4@start ...]
- Each slot fades in over 0.5 s (dissolving over the split page underneath) and fades out over 0.5 s.
- If a slot starts within 0.1 s of the previous slot's end, the previous slot is held (last frame) for 0.6 s and does NOT
  fade out, so the next slot cross-dissolves over it (e.g. Collective -> Book) instead of flashing bare footage.
- A slot that runs to the end of the video does not fade out.
Pair with split segments (SEGS) that run ~0.9 s past each slot start and begin ~0.9 s before each slot end, so the
split page is fully up under every dissolve. Then drop the separate slot tracks from CapCut (they are in the overlay now).
"""
import subprocess, sys
IN, OUT, DUR = sys.argv[1], sys.argv[2], float(sys.argv[3])
slots = []
for a in sys.argv[4:]:
    p, st = a.rsplit("@", 1)
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True).stdout)
    slots.append((p, float(st), d))
slots.sort(key=lambda x: x[1])
F = 0.5
fc, cur = ["[0:v]format=yuva444p10le[m0]"], "m0"
for i, (p, st, d) in enumerate(slots):
    nxt = slots[i + 1] if i + 1 < len(slots) else None
    chained = nxt and abs(nxt[1] - (st + d)) < 0.1
    to_end = st + d >= DUR - 0.05
    chain = f"[{i + 1}:v]" + ("tpad=stop_mode=clone:stop_duration=0.6," if chained else "") + f"format=yuva444p10le,fade=t=in:st=0:d={F}:alpha=1"
    if not chained and not to_end:
        chain += f",fade=t=out:st={d - F:.3f}:d={F}:alpha=1"
    chain += f",setpts=PTS-STARTPTS+{st}/TB[s{i}]"
    fc.append(chain)
    fc.append(f"[{cur}][s{i}]overlay=eof_action=pass[m{i + 1}]"); cur = f"m{i + 1}"
cmd = ["ffmpeg", "-y", "-v", "error", "-i", IN] + sum([["-i", p] for p, _, _ in slots], []) + [
    "-filter_complex", ";".join(fc), "-map", f"[{cur}]", "-t", str(DUR), "-c:v", "prores_ks", "-profile:v", "4444", "-qscale:v", __import__("os").environ.get("PRORES_Q", "10"),
    "-pix_fmt", "yuva444p10le", "-alpha_bits", "8", "-vendor", "apl0", "-map", "0:a?", "-c:a", "pcm_s16le", OUT]
subprocess.run(cmd, check=True)
print("wrote", OUT)
