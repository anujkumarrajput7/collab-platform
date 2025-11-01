@echo off
echo.
echo ========================================
echo   Starting CREATERRA Platform
echo ========================================
echo.

REM Kill any existing node processes
echo Cleaning up old processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo Starting Backend Server...
start "CREATERRA Backend" cmd /k "cd /d C:\Users\bajpa\Projects\collab-platform\server && npm run dev"

timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "CREATERRA Frontend" cmd /k "cd /d C:\Users\bajpa\Projects\collab-platform\client && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   CREATERRA is starting up!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:8080
echo.
echo Open your browser: http://localhost:8080
echo.
echo Two windows opened - DO NOT CLOSE THEM!
echo.
echo Press any key to exit this launcher...
pause >nul
