"""Remove EVERY pause left in a cut (mandatory step). Run after cut.py + transcribe.py, then re-cut with the new keep.
usage: python find_pauses.py <raw_clean.mp4> <keep.json> <cut.mp4.segs.json> <cut_words.json> <keep_out.json>
A pause = a gap > 0.25 s between two words, OR one word lasting > 0.8 s (whisper stretches a word over a pause,
e.g. "instead" 31.58-35.04). Each pause is found in the SOURCE with silencedetect (-32 dB, 0.15 s: stricter than
cut.py's -38 dB, so breaths and room noise count as silence) and cut, keeping ~0.1 s of air on each side:
  - pause inside one keep range  -> the range is split around the silence
  - pause at a join between two ranges (end of one sentence, start of the next) -> the first range's tail and the
    next range's head are trimmed to where the speech really ends/starts.
Prints every pause it removes. Re-run cut.py with keep_out.json, re-transcribe, and run this again until it reports 0.
"""
import json, re, subprocess, sys
SRC, KEEP_F, SEGS_F, WORDS_F, OUT = sys.argv[1:6]
keep = [list(r) for r in json.load(open(KEEP_F))]; segs = json.load(open(SEGS_F)); words = json.load(open(WORDS_F))
GAP, LONG, AIR = 0.25, 0.8, 0.1

def to_src(t):  # cut time -> source time
    acc = 0.0
    for a, b in segs:
        if t <= acc + (b - a) + 1e-6: return a + (t - acc)
        acc += b - a
    return segs[-1][1]

def rng(t):  # index of the keep range holding source time t
    for i, (a, b) in enumerate(keep):
        if a - 0.05 <= t <= b + 0.05: return i

def silences(a, b):
    log = subprocess.run(["ffmpeg", "-hide_banner", "-ss", f"{a:.3f}", "-t", f"{b - a:.3f}", "-i", SRC, "-vn", "-af",
                          "silencedetect=noise=-32dB:d=0.15", "-f", "null", "-"], capture_output=True, text=True).stderr
    st = [a + float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
    en = [a + float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
    return list(zip(st, en + [b] * (len(st) - len(en))))

flags = []
for i, (s, e, w) in enumerate(words):
    if e - s > LONG: flags.append((s + 0.15, e))
    if i and s - words[i - 1][1] > GAP: flags.append((words[i - 1][1], s))

splits, n = [], 0
for cs, ce in flags:
    a, b = to_src(cs), to_src(ce)
    ia, ib = rng(a), rng(b)
    if ia is None or ib is None: continue
    if ia == ib:  # pause inside a range
        for x, y in silences(max(keep[ia][0], a - 0.1), min(keep[ia][1], b + 0.1)):
            if y - x > 2 * AIR + 0.15: splits.append((ia, x + AIR, y - AIR))   # ignore < 0.15 s (inaudible)
    else:         # pause across a join: trim the tail of ia and the head of ib
        A0, A1 = keep[ia]; tail = silences(max(A0, a - 0.15), A1)
        if tail and abs(tail[-1][1] - A1) < 0.05 and A1 - (tail[-1][0] + AIR) > 0.08:
            print(f"trim tail {A1:.2f} -> {tail[-1][0] + AIR:.2f}"); keep[ia][1] = round(tail[-1][0] + AIR, 3); n += 1
        B0, B1 = keep[ib]; head = silences(B0, min(B1, b + 0.15))
        if head and abs(head[0][0] - B0) < 0.05 and (head[0][1] - AIR) - B0 > 0.08:
            print(f"trim head {B0:.2f} -> {head[0][1] - AIR:.2f}"); keep[ib][0] = round(head[0][1] - AIR, 3); n += 1

out = []
for i, (a, b) in enumerate(keep):
    cur = a
    for j, x, y in sorted(splits, key=lambda s: s[1]):
        if j == i and cur < x and y < b:
            out.append([round(cur, 3), round(x, 3)]); cur = y; n += 1
            print(f"remove pause {x:.2f}-{y:.2f} ({y - x:.2f}s)")
    out.append([round(cur, 3), b])
json.dump(out, open(OUT, "w"))
print(f"{n} pauses removed -> {OUT}")
