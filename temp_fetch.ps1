$u = 'http://localhost:3001/work/automated-email-to-planner-task-lifecycle'
try {
  $r = Invoke-WebRequest -Uri $u -UseBasicParsing -ErrorAction Stop
  $c = $r.Content
  $imgs = @('Email-to-Planner_Flow1_Trigger.png','Email-to-Planner_Flow2_Companion.png','Email-to-Planner_Flow3_ETagInject.png')
  foreach ($i in $imgs) {
    Write-Output "$i $($c.Contains($i))"
  }
  $start = $c.IndexOf('<h3>Our Approach & Solution</h3>')
  if ($start -ge 0) {
    $len = [Math]::Min(1200, $c.Length - $start)
    Write-Output '----SNIPPET----'
    Write-Output $c.Substring($start, $len)
  } else {
    Write-Output 'header not found'
  }
} catch {
  Write-Error $_.Exception.Message
  exit 1
}
