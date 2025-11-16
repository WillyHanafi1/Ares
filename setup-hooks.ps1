# Setup Git Hooks untuk Auto-Check README

Write-Host "🔧 Setting up Git hooks..." -ForegroundColor Cyan

$hookPath = ".git\hooks\pre-commit"

# Make sure hooks directory exists
if (-not (Test-Path ".git\hooks")) {
    New-Item -ItemType Directory -Path ".git\hooks" -Force | Out-Null
}

# Create pre-commit hook content
$hookContent = @'
#!/bin/sh
# Pre-commit hook untuk memastikan README.md selalu update

echo "🔍 Checking README.md status..."

# Check if README.md has been staged
if git diff --cached --name-only | grep -q "README.md"; then
  echo "✅ README.md is included in this commit"
else
  # Check if there are any code changes
  if git diff --cached --name-only | grep -qE '\.(tsx?|jsx?|css)$'; then
    echo "⚠️  WARNING: Code changes detected but README.md not updated!"
    echo "📝 Please update README.md to reflect your changes"
    echo ""
    echo "To skip this check (not recommended), use: git commit --no-verify"
    exit 1
  fi
fi

echo "✨ Pre-commit checks passed!"
exit 0
'@

# Write hook file
Set-Content -Path $hookPath -Value $hookContent -NoNewline

Write-Host "✅ Git hook created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Hook will check:" -ForegroundColor Yellow
Write-Host "   - If code files (.tsx, .ts, .jsx, .js, .css) are modified" -ForegroundColor Gray
Write-Host "   - If README.md is included in the commit" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 To bypass the hook (not recommended):" -ForegroundColor Yellow
Write-Host "   git commit --no-verify -m 'your message'" -ForegroundColor Gray
Write-Host ""
Write-Host "🎯 Setup complete! Your README will stay updated." -ForegroundColor Green
