@echo off
:: =========================================================================
:: FocusOS 1.0 - Windows Click-to-Run Interactive Bootstrap
:: This script automatically elevates itself to Administrator, verifies Node.js,
:: installs any required dependencies, boots the fullstack background server,
:: and launches the interactive dashboard.
:: =========================================================================
cd /d "%~dp0"
title FocusOS 1.0 - Launching administrative shield...
color 0B
setlocal EnableDelayedExpansion

echo =========================================================================
echo  FocusOS 1.0 - Hardlock ^& Website Shield Assistant
echo =========================================================================
echo.

:: Step 1: Request Administrative Privileges
echo [System Check] Verifying administrative rights...
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [Permission Required] Prompting for Windows Administrator privileges...
    powershell -Command "Start-Process -FilePath '%0' -Verb RunAs"
    exit /b
)
echo [System Check] Administrative privileges CONFIRMED.
echo.

:: Inject common Windows installation paths for Node.js in case elevated Administrator PATH is limited
set "PATH=!PATH!;C:\Program Files\nodejs;C:\Program Files (x86)\nodejs;%ProgramFiles%\nodejs;%ProgramFiles(x86)%\nodejs;%APPDATA%\npm;%USERPROFILE%\AppData\Roaming\npm"

:: Step 2: Check for Node.js Runtime environment
echo [Dependency Check] Verifying Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo Error: Node.js is NOT found in the system PATH!
    echo Even if installed, the Administrator account might not see it.
    echo.
    echo Searching common directory: C:\Program Files\nodejs
    if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=!PATH!;C:\Program Files\nodejs"
        echo Found local Node.js engine in Program Files! Updated local session PATH.
        echo.
    ) else (
        echo To use FocusOS and terminating blockers, please install Node.js (LTS version)
        echo from: https://nodejs.org/
        echo.
        echo Press any key to open the download page and close this script...
        pause >nul
        start https://nodejs.org/
        exit /b
    )
)

echo [Dependency Check] Node.js is present:
for /f "tokens=*" %%i in ('node -v') do echo   - Node version: %%i
echo.

:: Step 3: Check and Install local packages if node_modules is missing
if not exist "node_modules\" (
    echo [Package Setup] Package library not found. Resolving and installing files...
    echo Please wait, this only occurs on initial launch...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo Error: Dependency resolution failed! Double check internet connection & try again.
        pause
        exit /b
    )
    echo [Package Setup] Dependency packages resolved successfully.
    echo.
)

:: Step 4: Run Application build if dist folder is missing
if not exist "dist\" (
    echo [Build Setup] Production bundle not found. Triggering compilation...
    call npm run build
    echo [Build Setup] Compilation process finished successfully.
    echo.
)

:: Step 5: Boot and Trigger local browser instance
echo [Startup] Activating FocusOS background engine on port 3000...
echo Keep this window open while studying. Closing this terminal returns filters.
echo.

:: Open the browser concurrently immediately after starting the server
start http://localhost:3000

:: Run the server directly under raw Node process
call npm run dev

pause
