$c = Get-Content 'app\(main)\globals.css' -Raw
$c = $c -replace "font-family:\s*'Inter',\s*sans-serif;", "font-family: `"WF Visual Sans Variable`", Arial, sans-serif;"
$c = $c -replace "font-family:\s*'Plus Jakarta Sans',\s*sans-serif;", "font-family: `"WF Visual Sans Variable`", Arial, sans-serif;"
$c = $c -replace "font-family:\s*'Inter',\s*-apple-system,\s*BlinkMacSystemFont,\s*sans-serif;", "font-family: `"WF Visual Sans Variable`", Arial, sans-serif;"
Set-Content -Path 'app\(main)\globals.css' -Value $c
