$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$repo = 'C:\all-work\rea\uw-2'
Set-Location -LiteralPath $repo
$documents = @('README.md','HANDOFF.md','remake\README.md','remake\docs\joao-candidate-handoff-2026-10-23.md')
$results = [Collections.Generic.List[object]]::new()
$links = 0
$pendingLinks = [Collections.Generic.List[string]]::new()
$fences = 0
foreach ($path in $documents) {
  $text = [IO.File]::ReadAllText((Join-Path $repo $path))
  foreach ($match in [regex]::Matches($text, '\]\(([^)#]+)(?:#[^)]*)?\)')) {
    $target = $match.Groups[1].Value
    if ($target -match '^[a-z]+:|^#') { continue }
    $relative = [Uri]::UnescapeDataString($target)
    $resolved = [IO.Path]::GetFullPath((Join-Path (Split-Path (Join-Path $repo $path)) $relative))
    if (-not (Test-Path -LiteralPath $resolved)) {
      if ($target.EndsWith('candidate-5e2487a-manifest.json')) { $pendingLinks.Add($path + ': ' + $target); continue }
      throw ('Missing link in ' + $path + ': ' + $target)
    }
    $links++
  }
  foreach ($match in [regex]::Matches($text, '(?ms)^```powershell\s*\n(.*?)^```')) {
    $tokens = $null
    $errors = $null
    [Management.Automation.Language.Parser]::ParseInput($match.Groups[1].Value,[ref]$tokens,[ref]$errors) | Out-Null
    if (@($errors).Count -gt 0) { throw "PowerShell syntax error in $path" }
    $fences++
  }
}
$huskyDocument = [IO.File]::ReadAllText((Join-Path $repo 'HANDOFF.md'))
$husky = [regex]::Match($huskyDocument,'(?ms)^\$joaoHadHusky = .*?(?=^npm run verify)').Value
if (-not $husky) { throw 'HUSKY block not found' }
$hadOriginal = Test-Path Env:HUSKY
$original = $env:HUSKY
try {
  foreach ($case in @(
    @{ Name='absent-success'; Present=$false; Exit=0 },
    @{ Name='existing-success'; Present=$true; Exit=0 },
    @{ Name='absent-failure'; Present=$false; Exit=42 },
    @{ Name='existing-failure'; Present=$true; Exit=42 }
  )) {
    if ($case.Present) { $env:HUSKY = 'original-husky-value' } else { Remove-Item Env:HUSKY -ErrorAction SilentlyContinue }
    $safe = $husky.Replace('npm ci', ('$global:LASTEXITCODE = ' + $case.Exit))
    $caught = $false
    try { & ([scriptblock]::Create($safe)) } catch { $caught = $true }
    $presentAfter = Test-Path Env:HUSKY
    $valueAfter = $env:HUSKY
    $passed = $presentAfter -eq $case.Present -and ($caught -eq ($case.Exit -ne 0))
    if ($case.Present) { $passed = $passed -and $valueAfter -eq 'original-husky-value' }
    $results.Add([pscustomobject]@{name=$case.Name;pass=$passed;restoredPresence=$presentAfter;caughtFailure=$caught})
    if (-not $passed) { throw "HUSKY restoration failed: $($case.Name)" }
  }
} finally {
  if ($hadOriginal) { $env:HUSKY=$original } else { Remove-Item Env:HUSKY -ErrorAction SilentlyContinue }
}
git diff --check -- README.md HANDOFF.md remake/README.md remake/docs/joao-candidate-handoff-2026-10-23.md remake/uw2-launch.bat
if ($LASTEXITCODE -ne 0) { throw 'diff check failed' }
$report = [ordered]@{ localLinks=$links; pendingManifestLinks=$pendingLinks.ToArray(); parsedPowerShellFences=$fences; huskyRestoration=$results.ToArray(); diffCheck='PASS'; notes='HUSKY npm ci replaced only with a simulated exit code; no npm install, verify or game command executed.' }
$reportPath = Join-Path $repo 'remake\.worktrees\joao-publication-20261023\launcher\docs-validation.json'
[IO.File]::WriteAllText($reportPath,($report|ConvertTo-Json -Depth 7),[Text.UTF8Encoding]::new($false))
$report | ConvertTo-Json -Depth 7