@echo off
title LayoutLetter
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  echo You can still open index.html for browser-only demo mode.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing project packages...
  call npm install
  if errorlevel 1 (
    echo.
    echo Package installation failed. Check your internet connection, then run this file again.
    pause
    exit /b 1
  )
)

echo Starting LayoutLetter...
start "" http://localhost:3000
call npm start
