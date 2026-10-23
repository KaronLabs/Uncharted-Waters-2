param(
  [Parameter(Mandatory=$true)][int]$TargetPid,
  [Parameter(Mandatory=$true)][int]$Left,
  [Parameter(Mandatory=$true)][int]$Top,
  [Parameter(Mandatory=$true)][int]$Width,
  [Parameter(Mandatory=$true)][int]$Height
)

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class NativeWindowSize {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int x, int y, int cx, int cy, uint flags);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
'@

$process = Get-Process -Id $TargetPid -ErrorAction Stop
$handle = $process.MainWindowHandle
if ($handle -eq [IntPtr]::Zero) { throw "No native main window for PID $TargetPid" }
if (-not [NativeWindowSize]::SetWindowPos($handle, [IntPtr]::Zero, $Left, $Top, $Width, $Height, 0x44)) { throw 'SetWindowPos failed' }
$null = [NativeWindowSize]::SetForegroundWindow($handle)
Start-Sleep -Milliseconds 200
$rect = New-Object NativeWindowSize+RECT
if (-not [NativeWindowSize]::GetWindowRect($handle, [ref]$rect)) { throw 'GetWindowRect failed' }
[pscustomobject]@{
  pid=$TargetPid; left=$rect.Left; top=$rect.Top;
  width=$rect.Right-$rect.Left; height=$rect.Bottom-$rect.Top
} | ConvertTo-Json -Compress
