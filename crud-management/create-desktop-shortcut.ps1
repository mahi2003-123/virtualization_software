# ==============================================================================
# Script to create a Desktop Shortcut for WorkforcePro CRUD Application
# ==============================================================================

$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)
$ShortcutPath = Join-Path -Path $DesktopPath -ChildPath "WorkforcePro CRUD.url"

# Create URL Shortcut pointing to http://localhost
$ShortcutContent = @"
[{000214A0-0000-0000-C000-000000000046}]
Prop3=19,0
[InternetShortcut]
IDList=
URL=http://localhost
IconIndex=0
IconFile=C:\Windows\System32\shell32.dll
"@

Set-Content -Path $ShortcutPath -Value $ShortcutContent -Encoding ASCII
Write-Host "Desktop shortcut created successfully at: $ShortcutPath" -ForegroundColor Green
Write-Host "Opening http://localhost in your default web browser..." -ForegroundColor Cyan
Start-Process "http://localhost"
