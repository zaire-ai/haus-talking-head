"""Word-level transcript (faster-whisper small.en, CPU) for captions and beat timing.
usage: python transcribe.py <video.mp4> <words.json>   ->  [[start, end, word], ...]
Also prints the transcript as timestamped lines for planning.
(PyAV in this env rejects file paths, so audio is decoded with ffmpeg and passed as a numpy array.)
"""
import sys, json, subprocess, wave, numpy as np, os, tempfile
os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
from faster_whisper import WhisperModel
src, out = sys.argv[1:3]
wav = os.path.join(tempfile.gettempdir(), "haus_tx.wav")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-vn", "-ac", "1", "-ar", "16000", wav], check=True)
w = wave.open(wav); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
m = WhisperModel("small.en", device="cpu", compute_type="int8")
segs, _ = m.transcribe(a, word_timestamps=True, language="en",
                       initial_prompt="Evolution Haus, HAUS, The Evolve Collective, Melissa, Evolvers, HAUS Platform.")
W = [(round(x.start, 2), round(x.end, 2), x.word.strip()) for s in segs for x in s.words]
json.dump(W, open(out, "w"))
line, st = [], None
for s, e, t in W:
    st = s if st is None else st; line.append(t)
    if t.endswith((".", ",", "?")) or len(line) >= 9:
        print(f"{st:7.2f}-{e:7.2f} | {' '.join(line)}"); line, st = [], None
