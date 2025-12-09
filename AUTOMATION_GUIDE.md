# README Update Guide

## Git Pre-Commit Hook
Commits with code changes (`.ts`, `.tsx`, `.css`) require README.md update.

## Bypass (for minor fixes)
```bash
git commit --no-verify -m "fix: typo"
```

## Re-install Hook
```powershell
.\setup-hooks.ps1
```

## When to Update README
- New features/components
- New dependencies
- Config changes
- Breaking changes

## When NOT Needed
- Bug fixes
- Refactoring
- Comment changes
