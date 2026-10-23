$ErrorActionPreference='Stop'
$repo='C:\all-work\rea\uw-2'
$src=Join-Path $repo 'remake\.worktrees\joao-completion'
$dst=Join-Path $repo 'remake\docs\handoff\2026-10-23\evidence\candidate-5e2487a'
$existing=@(Get-ChildItem -LiteralPath $dst -Force)
if($existing.Count -ne 1 -or $existing[0].Name -ne 'prepare-public-evidence.ps1'){throw 'Unexpected output contents'}
$groups=@('diagnostics\joao-candidate-source-5e2487a','diagnostics\joao-slot-smoke-newexe-20261023-200414','diagnostics\joao-window-native-newexe-20261023-200818','diagnostics\joao-ime-physical-20261023-1792757292327','diagnostics\joao-court-retrial-6a747a1-20261023','evidence\joao-full-20261023-1746-wind')
$images=@('fresh-korean-joao-selection.png','harbor-dialogue.png','slot-1-save-success.png','slot-2-save-success.png','relaunch-slot1-s2-to-s1.png','relaunch-slot2-s1-to-s2.png','1280x720-native.png','1366x768-native.png','native-window-ime-attempt.jpg','001-m1-complete.png','002-m2-complete.png','failure.png')
$rx='(?i)C(?::|%3A)(?:(?:\\+|/+|%5C|%2F))Users(?:(?:\\+|/+|%5C|%2F))[A-Za-z0-9_.-]+\b'
function Hash([byte[]]$b){[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($b)).ToLowerInvariant()}
$plan=[Collections.Generic.List[object]]::new()
$excluded=[Collections.Generic.List[object]]::new()
foreach($g in $groups){
 $stack=[Collections.Generic.Stack[string]]::new();$stack.Push((Join-Path $src $g))
 while($stack.Count -gt 0){foreach($i in Get-ChildItem -LiteralPath ($stack.Pop()) -Force){
  $sr=[IO.Path]::GetRelativePath($repo,$i.FullName).Replace('\','/')
  $pr=[IO.Path]::GetRelativePath($src,$i.FullName).Replace('\','/')
  if(($i.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0){$excluded.Add(@{sourceRelativePath=$sr;reason='reparse-point-not-followed'});continue}
  if($i.PSIsContainer){
   if($i.Name -match '^(profile|user-data|User Data|Default|Cache|Code Cache|GPUCache|DawnCache|ShaderCache|node_modules|.git)$'){$excluded.Add(@{sourceRelativePath=$sr;reason='private-directory-not-traversed'});continue}
   $stack.Push($i.FullName);continue
  }
  if($i.Name -match '(?i)^(Cookies|DevToolsActivePort|Login Data|Web Data|Local State)$'){$excluded.Add(@{sourceRelativePath=$sr;reason='private-browser-data'});continue}
  $image=$i.Extension -match '(?i)^\.(png|jpe?g)$'
  if($image -and $i.Name -notin $images){$excluded.Add(@{sourceRelativePath=$sr;reason='redundant-screenshot-not-selected-or-reviewed'});continue}
  if($i.Extension -notmatch '(?i)^\.(png|jpe?g|json|jsonl|cjs|ps1|log|md|txt)$'){throw "Unexpected type: $sr"}
  $b=[IO.File]::ReadAllBytes($i.FullName);$raw=[Text.Encoding]::Latin1.GetString($b)
  $n=[regex]::Matches($raw,$rx).Count
  if($image -and $n){throw "Image embedded personal path: $sr"}
  $derived=$b
  if($n){$derived=[Text.Encoding]::Latin1.GetBytes([regex]::Replace($raw,$rx,'%USERPROFILE%'))}
  $plan.Add([pscustomobject]@{source=$i.FullName;sr=$sr;pr=$pr;original=$b;derived=$derived;n=$n;image=$image})
 }}
}
if($plan.Count -ne 55 -or @($plan|Where-Object{$_.image}).Count -ne 12){throw 'Reviewed inventory changed'}
$entries=[Collections.Generic.List[object]]::new()
foreach($i in ($plan|Sort-Object pr)){
 $target=Join-Path $dst $i.pr
 [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target))|Out-Null
 $f=[IO.File]::Open($target,[IO.FileMode]::CreateNew,[IO.FileAccess]::Write)
 try{$f.Write($i.derived,0,$i.derived.Length)}finally{$f.Dispose()}
 $oh=Hash $i.original
 if((Hash ([IO.File]::ReadAllBytes($i.source))) -ne $oh){throw "Source changed: $($i.sr)"}
 $entries.Add([ordered]@{
 sourceRelativePath=$i.sr;publishedRelativePath=$i.pr
 original=[ordered]@{sha256=$oh;bytes=$i.original.Length}
 derived=[ordered]@{sha256=(Hash $i.derived);bytes=$i.derived.Length}
 transformation=[ordered]@{kind=$(if($i.n){'personal-home-path-redaction'}else{'byte-identical'});replacementCount=$i.n;replacement=$(if($i.n){'%USERPROFILE%'}else{$null});bytePolicy='Only matched ASCII path bytes replaced with lossless Latin1 byte mapping; other bytes and line endings preserved'}
 visualReview=$(if($i.image){'Viewed locally at supplied resolution: game/native window/Windows OSK; no visible personal home path or authentication data observed'}else{$null})
 })
}
$p=[ordered]@{
 schemaVersion=1;createdAtUtc=[DateTime]::UtcNow.ToString('o')
 repositoryRelativeBundlePath='remake/docs/handoff/2026-10-23/evidence/candidate-5e2487a'
 candidate=[ordered]@{productSourceCommit='5e2487a82d060d88cf90cad95cd081958bcf115b';exeSha256='970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0';exeBytes=109894344;fullJoaoJourney='INCOMPLETE';physicalWindowsKoreanIme='INCOMPLETE'}
 executionHeads=@{court='6a747a1946904ec5ae21a5ab2ed5b53a408fa434';courtRecordedBy='diagnostics/joao-court-retrial-6a747a1-20261023/review-head.txt';otherHistoricalExecutionCheckoutHeads='unverified; names are not proof'}
 previousJourney=@{directory='evidence/joao-full-20261023-1746-wind';exeSha256='ed44eb4f2731352a049a35a817378d22a6ecbbd05dd134819e9873c3f822f5ef';verdict='previous EXE failure; not new candidate completion evidence'}
 privacy=@{privateDirectoriesNotTraversed=$true;reparsePointsNotFollowed=$true;existingUserSlotsNotIncluded=$true;includedSlots='Only isolated diagnostic run/slots in selected source groups';scan='High-confidence private-key, OpenAI/GitHub/AWS token, JWT, bearer and credential-assignment patterns: no matches in retained text. Bounded scan, not proof of absence of all secret formats.';homePathForms='Windows, JSON repeated backslash, slash/file URL, percent-encoded colon/separator';imageReview='12 selected screenshots inspected; 5 redundant screenshots omitted'}
 files=@($entries);exclusions=@($excluded|Sort-Object sourceRelativePath)
 generatedFiles=@('README.md','provenance.json','prepare-public-evidence.ps1')
}
[IO.File]::WriteAllText((Join-Path $dst 'provenance.json'),($p|ConvertTo-Json -Depth 10),[Text.UTF8Encoding]::new($false))
[pscustomobject]@{copied=$entries.Count;selectedImages=12;redactedFiles=@($plan|Where-Object{$_.n}).Count;exclusions=$excluded.Count}|ConvertTo-Json -Compress
