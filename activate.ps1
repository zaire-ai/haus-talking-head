# Dot-source before work: . "$env:USERPROFILE\.claude\skills\haus-talking-head\activate.ps1"
$S = $PSScriptRoot
$env:PATH = "$S\tools\ffmpeg-bin;$S\node_modules\.bin;$S\.venv\Scripts;$env:PATH"
Write-Host "haus-talking-head tools active (ffmpeg, hyperframes, python from $S)"
