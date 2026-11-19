# One-time setup for the bundled toolchain. Run: powershell -ExecutionPolicy Bypass -File setup.ps1
$S = $PSScriptRoot
Push-Location $S
npm install                       # HyperFrames into $S\node_modules
python -m venv .venv
& "$S\.venv\Scripts\python.exe" -m pip install -r requirements.txt
Pop-Location
Write-Host "haus-talking-head toolchain ready"
