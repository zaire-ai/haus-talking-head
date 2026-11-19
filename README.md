# haus-talking-head

Claude Code skill for editing Evolution Haus talking-head videos (cut, pause removal, BiRefNet cutout, HyperFrames overlays, captions, CapCut finish).

## Install

**Step-by-step guide with copy buttons:** https://claude.ai/artifact/QR6hszCwSLRJiZ2a9Y2Exk

1. Clone into your Claude skills folder:
   `git clone https://github.com/zaire-ai/haus-talking-head.git "$env:USERPROFILE\.claude\skills\haus-talking-head"`
2. Install the toolchain (Node, Python 3 and an NVIDIA GPU needed):
   `powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.claude\skills\haus-talking-head\setup.ps1"`
3. Put ffmpeg/ffprobe in `tools/ffmpeg-bin/` (or have them on PATH).
4. In Claude Code, ask it to edit a video with the haus-talking-head skill.

Note: SKILL.md contains some paths from the original machine (`C:/Users/Zaire/...`); Claude adapts them to your user folder.
