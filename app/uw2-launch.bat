@echo off
rem Uncharted Waters 2 Korean Revival - Electron Launcher
cd /d "%~dp0"
if not exist "node_modules\vite" (
  echo [UW2] Installing npm dependencies...
  call npm install
)
if not exist "node_modules\electron\dist\electron.exe" (
  echo [UW2] Downloading Electron runtime...
  node ".\node_modules\electron\install.js"
)
if not exist "dist\index.html" (
  echo [UW2] Building web bundle...
  call npx vite build
)
start "" ".\node_modules\electron\dist\electron.exe" .
