---
name: capcut-finish
description: Personal add-on to the Herk Edit Kit. Edit videos with FFmpeg, HyperFrames and CapCut Pro together. The kit's tools can cut, trim, join, mix and caption; CapCut Pro, driven through computer use, adds Pro effects and does the final export. Use whenever the user wants a video edited.
---

# Edit with FFmpeg, HyperFrames and CapCut Pro together

## The rule

All three tools may do editing work. Use whichever fits each step best.

- **FFmpeg / ffprobe:** inspect files, cut, trim, join, mix audio, convert, burn or attach captions.
- **HyperFrames:** animated overlays, captions, motion graphics, and renders (MP4, MOV/WebM with alpha, PNG sequence).
- **CapCut Pro (computer use):** anything that needs a CapCut or Pro feature, plus assembly and the final export. Unless the user says otherwise, the finished video is exported from CapCut.
- The kit's own skills (`edit-video`, `cut-silences`, `cut-mistakes`, `short-form-edit`, and the rest) may be used for the preparation stages.

Never overwrite the raw source. Write each stage to a new filename.

## 1. Prepare in the kit

Follow `edit-video` or `short-form-edit` for transcription, silence and mistake cuts, and
motion graphics. Stop before the final render when the finish will happen in CapCut.

Create `video-projects/<slug>/capcut-handoff/` and put in it, numbered in stacking order:

- `01-main-cut.mp4`: the prepared cut (ffprobe it; record fps and resolution).
- `02-overlay-*.mov`: HyperFrames overlays with transparency (ProRes 4444; alpha verified
  with FFmpeg). Whether CapCut shows the alpha correctly is UNVERIFIED; test one short clip
  first. Fallback: a PNG sequence. WebM alpha is unverified.
- `03-captions.srt`, if captions are imported rather than burned in.
- `04-audio-*.wav`: music, plus `05-sfx-*.wav` sound effects (see Sound effects below), if used.
- `HANDOFF.md`: file, start time, track, and the CapCut Pro effect to apply.

## 2. Finish in CapCut with computer use

Read the computer-use skill first. If no computer-use tools are present, say so and stop
the CapCut stage; do not pretend to operate CapCut.

- The user opens CapCut and signs in. Never type passwords or payment details.
- Ask before any purchase, subscription change, or cloud upload.
- Import files, arrange them per `HANDOFF.md`, apply Pro features, preview, then export
  into `video-projects/<slug>/renders/` under a new filename. Screenshot after each step.

## Free tools outside CapCut

The user has CapCut Pro, so anything inside CapCut, Pro features and Pro assets included, is
fine to use. Outside CapCut, use free tools only. Never use a paid service, paid credits or
an API key that costs money unless the user approves that specific item.

- **Transcription:** local Whisper (for example whisper-cpp or faster-whisper) instead of the
  kit's default ElevenLabs Scribe, which needs a paid key. Install Python packages into the
  project's `.venv`, not system-wide.
- **Voiceover:** local Kokoro text-to-speech, if a synthetic voice is wanted.
- **Background music:** CapCut's library first. Outside it, free music from Pixabay or the
  YouTube Audio Library, with the same license check as sound effects.
- **Stock footage and images:** free libraries such as Pexels or Pixabay, with the same
  ask-before-download and license check.
- **Editing and graphics:** FFmpeg and HyperFrames (both free and local).

`hyperframes doctor` lists whisper-cpp, Kokoro and MusicGen as optional local tools. Install
one only when a task needs it, and tell the user what it is and how big it is first.

## Sound effects

Pick the source in this order:

1. **Footage and kit assets:** reuse anything the user already has.
2. **CapCut's built-in sound effects, Pro ones included:** search the Audio > Sound effects
   panel in CapCut. Note the effect names in `HANDOFF.md`.
3. **Synthesized with FFmpeg:** whooshes (filtered noise sweeps), taps, clicks and short tones
   can be generated locally for free, as the kit's earlier projects did. Write to a new
   file such as `assets/sfx-whoosh-1.wav`.
4. **Free online libraries:** Pixabay, Mixkit, Freesound (CC0 filter) or the YouTube Audio
   Library. Before downloading, tell the user the file name, source, size and license, and
   wait for a yes. Check the license permits the intended use, and keep a
   `sfx-credits.md` listing source, license and any required attribution.

Placement rules (from `docs/EDITING-PLAYBOOK.md`):

- Effects follow visible actions, not every cut: a soft air whoosh on a real spatial move, a
  damped tap when a logo lands, a dry click for small UI, paper for documents.
- Avoid laser zaps, pitch-drop plops, sci-fi chirps, and a whoosh on every cut.
- Keep effects well below the voice in the mix. Listen across each join.

Add each effect to `HANDOFF.md` with its file or CapCut name and start time. If it is placed
in CapCut, confirm the placement in a screenshot.

## 3. Verify

Inspect the exported file with ffprobe, extract frames, and check cuts, captions and
audio joins. Record what was checked, and what could not be checked, in `VERIFY.md`.

## User preferences (fill in)

- Preferred CapCut Pro effects/transitions: TODO
- Export resolution, fps, bitrate: TODO
- Caption style: TODO
- Who captions by default (HyperFrames or CapCut): TODO
