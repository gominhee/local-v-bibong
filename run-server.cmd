@echo off
REM npm 없이 서버만 켤 때 (공백 경로 문제 회피)
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" server.js
pause
