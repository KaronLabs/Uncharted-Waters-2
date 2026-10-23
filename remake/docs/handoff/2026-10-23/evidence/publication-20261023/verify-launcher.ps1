$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$repo = 'C:\all-work\rea\uw-2'
$root = Join-Path $repo 'remake\.worktrees\joao-publication-20261023\launcher'
$testRoot = Join-Path $root ('launcher tests with spaces ' + (Get-Date -Format yyyyMMdd-HHmmss))
New-Item -ItemType Directory -Path $testRoot | Out-Null
$launcherPath = Join-Path $repo 'remake\uw2-launch.bat'
$launcher = [IO.File]::ReadAllText($launcherPath)
$originalStart = 'start "" "%~dp0dist-desktop\%UW2_PACKAGED%"'
$stubStart = 'call "%~dp0stub-start.cmd" "%~dp0dist-desktop\%UW2_PACKAGED%"'
if (-not $launcher.Contains($originalStart)) { throw 'Packaged START call not found' }
$testLauncher = $launcher.Replace($originalStart, $stubStart)
$stub = @(
  '@echo off',
  '> "%UW2_LAUNCHER_TEST_LOG%" echo %~1',
  'if defined UW2_LAUNCHER_TEST_FAIL exit /b 37',
  'exit /b 0'
) -join [Environment]::NewLine
$previousLog = $env:UW2_LAUNCHER_TEST_LOG
$previousFail = $env:UW2_LAUNCHER_TEST_FAIL
$results = [Collections.Generic.List[object]]::new()
try {
  foreach ($case in @(
    @{ Name='new-exe-preferred'; New=$true; Old=$true; Fail=$false; Exit=0; Selected='UW2-Joao-Korean.exe' },
    @{ Name='old-exe-fallback'; New=$false; Old=$true; Fail=$false; Exit=0; Selected='UW2-QCaine-Preview.exe' },
    @{ Name='launch-failure-propagates'; New=$true; Old=$true; Fail=$true; Exit=37; Selected='UW2-Joao-Korean.exe' }
  )) {
    $caseDir = Join-Path $testRoot $case.Name
    $distDir = Join-Path $caseDir 'dist-desktop'
    New-Item -ItemType Directory -Path $distDir | Out-Null
    [IO.File]::WriteAllText((Join-Path $caseDir 'uw2-launch.bat'), $testLauncher, [Text.ASCIIEncoding]::new())
    [IO.File]::WriteAllText((Join-Path $caseDir 'stub-start.cmd'), $stub, [Text.ASCIIEncoding]::new())
    if ($case.New) { [IO.File]::WriteAllText((Join-Path $distDir 'UW2-Joao-Korean.exe'), 'inert test marker; not executable') }
    if ($case.Old) { [IO.File]::WriteAllText((Join-Path $distDir 'UW2-QCaine-Preview.exe'), 'inert test marker; not executable') }
    $env:UW2_LAUNCHER_TEST_LOG = Join-Path $caseDir 'selected-path.txt'
    if ($case.Fail) { $env:UW2_LAUNCHER_TEST_FAIL = '1' } else { $env:UW2_LAUNCHER_TEST_FAIL = $null }
    $stdout = @(& $env:ComSpec /d /c ('call "' + (Join-Path $caseDir 'uw2-launch.bat') + '"') 2>&1 | ForEach-Object { $_.ToString() })
    $actualExit = $LASTEXITCODE
    $selected = [IO.File]::ReadAllText($env:UW2_LAUNCHER_TEST_LOG).Trim()
    $expectedSelected = Join-Path $distDir $case.Selected
    $pass = $actualExit -eq $case.Exit -and $selected -eq $expectedSelected
    $result = [ordered]@{ name=$case.Name; pass=$pass; exit=$actualExit; expectedExit=$case.Exit; selected=$selected; expectedSelected=$expectedSelected; stdout=$stdout }
    $results.Add([pscustomobject]$result)
    [IO.File]::WriteAllText((Join-Path $caseDir 'result.json'), ($result | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))
    if (-not $pass) { throw "Failed launcher case $($case.Name)" }
  }
} finally {
  $env:UW2_LAUNCHER_TEST_LOG = $previousLog
  $env:UW2_LAUNCHER_TEST_FAIL = $previousFail
}
$report = [ordered]@{
  launcherSha256 = (Get-FileHash -LiteralPath $launcherPath -Algorithm SHA256).Hash.ToLowerInvariant()
  method = 'Copy launcher into paths containing spaces; replace only packaged START command with inert CMD stub; retain selection and error handling.'
  limits = 'Does not execute game or native START; does not validate GUI, source build fallback, native launch errors, or child process exit code.'
  cases = $results.ToArray()
}
[IO.File]::WriteAllText((Join-Path $root 'launcher-validation.json'), ($report | ConvertTo-Json -Depth 8), [Text.UTF8Encoding]::new($false))
$results | Format-Table name, pass, exit
Write-Output "ARTIFACT_ROOT $testRoot"