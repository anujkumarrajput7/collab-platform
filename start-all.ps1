# CREATERRA - Start All Servers
Write-Host "🚀 Starting CREATERRA Platform..." -ForegroundColor Cyan
Write-Host ""

# Kill any existing Node processes on ports 5000 and 8080
Write-Host "🧹 Cleaning up old processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start Backend Server
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Green
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\bajpa\Projects\collab-platform\server; npm run dev" -PassThru

Start-Sleep -Seconds 5

# Start Frontend Server
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Magenta
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\bajpa\Projects\collab-platform\client; npm run dev" -PassThru

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "✅ CREATERRA is starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Server Status:" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Open your browser and go to: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Two PowerShell windows will open - DO NOT CLOSE THEM!" -ForegroundColor Red
Write-Host ""
Write-Host "Press Ctrl+C here when you want to stop monitoring..." -ForegroundColor Gray

# Keep this script running
while ($true) {
    Start-Sleep -Seconds 10
    if ($backend.HasExited) {
        Write-Host "❌ Backend crashed!" -ForegroundColor Red
        break
    }
    if ($frontend.HasExited) {
        Write-Host "❌ Frontend crashed!" -ForegroundColor Red
        break
    }
}
