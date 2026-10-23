@echo off
setlocal
rem Run the packaged game first; prepare a source checkout only when needed.
pushd "%~dp0"
if errorlevel 1 exit /b %errorlevel%
set "UW2_EXIT=0"

if exist "dist-desktop\UW2-QCaine-Preview.exe" goto packaged

where node >nul 2>&1
if errorlevel 1 goto missing_node
where npm.cmd >nul 2>&1
if errorlevel 1 goto missing_node
node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 22 ? 0 : 1)"
if errorlevel 1 goto old_node

echo [UW2] Checking game assets...
node "scripts\verify-assets.js"
if errorlevel 1 goto bad_assets

if not exist "node_modules\.bin\webpack.cmd" goto install
if exist "node_modules\electron\dist\electron.exe" goto build
:install
echo [UW2] Installing locked npm dependencies...
call npm ci
if errorlevel 1 goto failed

:build
echo [UW2] Building the game...
call npm run build
if errorlevel 1 goto failed

echo [UW2] Starting the QCaine game from source...
start "" "%~dp0node_modules\electron\dist\electron.exe" "%~dp0desktop\main.cjs"
if errorlevel 1 goto failed
goto done

:packaged
echo [UW2] Starting UW2-QCaine-Preview.exe...
start "" "%~dp0dist-desktop\UW2-QCaine-Preview.exe"
if errorlevel 1 goto failed
goto done

:missing_node
echo [UW2] Node.js 22 or later and npm are required to run this source checkout.
echo [UW2] Use the packaged dist-desktop\UW2-QCaine-Preview.exe when available.
set "UW2_EXIT=9009"
goto done

:old_node
set "UW2_EXIT=%errorlevel%"
echo [UW2] Node.js 22 or later is required. Please update Node.js and try again.
goto done

:bad_assets
set "UW2_EXIT=%errorlevel%"
echo [UW2] Game assets are missing or invalid. For Git LFS pointers, run:
echo [UW2]   git lfs pull
echo [UW2] Then run this launcher again.
goto done

:failed
set "UW2_EXIT=%errorlevel%"

:done
popd
exit /b %UW2_EXIT%
