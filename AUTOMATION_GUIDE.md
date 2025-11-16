# 🤖 Automated README Update System

## 📋 Ringkasan

Proyek ini sekarang memiliki sistem otomatis untuk memastikan `README.md` selalu update setiap kali ada perubahan kode.

## ✅ Yang Telah Disetup

### 1. **Git Pre-Commit Hook**
- **Lokasi**: `.git/hooks/pre-commit`
- **Fungsi**: Memeriksa apakah README.md di-update ketika ada perubahan kode
- **Behavior**: 
  - ✅ Jika ada perubahan `.ts`, `.tsx`, `.js`, `.jsx`, `.css` dan README.md juga di-stage → LANJUT
  - ❌ Jika ada perubahan code tapi README.md tidak di-stage → TOLAK COMMIT
  - ✅ Jika hanya perubahan non-code files → LANJUT

### 2. **README_UPDATE_GUIDE.md**
- Panduan lengkap kapan dan bagaimana update README
- Checklist untuk berbagai jenis perubahan
- Best practices dokumentasi

### 3. **setup-hooks.ps1**
- Script PowerShell untuk setup ulang hooks jika diperlukan
- Dapat dijalankan kapan saja untuk reinstall hooks

### 4. **Comprehensive README.md**
- ✅ Dokumentasi lengkap semua komponen
- ✅ Tech stack details dengan badges
- ✅ Design system specifications
- ✅ Performance & accessibility guidelines
- ✅ Deployment instructions
- ✅ Roadmap & contributing guide

## 🚀 Cara Kerja Workflow

### Normal Workflow (Recommended)
```bash
# 1. Buat perubahan pada code
# Edit files: components/NewFeature.tsx

# 2. Update README.md
# Tambahkan dokumentasi fitur baru di README.md

# 3. Stage semua perubahan
git add .

# 4. Commit (hook akan auto-check)
git commit -m "feat: add new feature"
# ✅ Hook check: README.md included → PASS

# 5. Push ke GitHub
git push origin main
```

### Jika Lupa Update README
```bash
# 1. Edit code
# Edit: components/Feature.tsx

# 2. Stage & commit (lupa update README)
git add .
git commit -m "feat: new feature"

# ❌ Output:
# ⚠️  WARNING: Code changes detected but README.md not updated!
# 📝 Please update README.md to reflect your changes
# Commit DITOLAK!

# 3. Fix: Update README
# Edit: README.md

# 4. Tambahkan README dan commit ulang
git add README.md
git commit -m "feat: new feature"
# ✅ Hook check: README.md included → PASS
```

### Emergency Bypass (Not Recommended)
```bash
# HANYA untuk minor fixes (typo, formatting, dll)
git commit --no-verify -m "fix: typo in comment"
```

## 📝 Checklist Update README

### ✅ Wajib Update README Jika:
- [ ] Menambah komponen/fitur baru
- [ ] Menambah dependencies baru
- [ ] Mengubah struktur folder
- [ ] Mengubah konfigurasi (tailwind, typescript, dll)
- [ ] Mengubah deployment process
- [ ] Menyelesaikan item dari roadmap
- [ ] Breaking changes
- [ ] Perubahan API atau props interface

### ⚠️ Opsional Update README:
- Refactoring internal (tidak mengubah API)
- Bug fixes minor
- Performance optimization (jika tidak mengubah cara pakai)

### 🚫 Tidak Perlu Update README:
- Typo fixes di comments
- Formatting code
- Update dependencies patch version
- Add comments

## 🛠️ Maintenance

### Re-install Git Hook
Jika hook hilang atau tidak berfungsi:

```powershell
# Windows PowerShell
.\setup-hooks.ps1
```

```bash
# Git Bash / Linux / Mac
chmod +x .git/hooks/pre-commit
```

### Disable Hook Temporarily
```bash
# Untuk satu commit
git commit --no-verify -m "message"

# Untuk disable permanent (NOT RECOMMENDED)
rm .git/hooks/pre-commit
```

### Enable Hook Kembali
```powershell
.\setup-hooks.ps1
```

## 📊 Statistik Update

**Total Updates:** 1
- Initial comprehensive README: ✅ 16 Nov 2025

## 🎯 Best Practices

### 1. **Update README Bersamaan Dengan Code**
Jangan tunggu sampai akhir development. Update README setiap kali selesai feature.

### 2. **Keep It Accurate**
README yang outdated lebih buruk dari tidak ada README. Selalu jaga akurasi.

### 3. **Use Clear Language**
Tulis dengan jelas dan concise. Hindari jargon yang tidak perlu.

### 4. **Add Examples**
Untuk fitur kompleks, tambahkan code example atau screenshot.

### 5. **Version Your Changes**
Jika ada breaking changes, tambahkan migration guide.

## 🔍 Troubleshooting

### Problem: Hook tidak jalan
**Solution:**
```powershell
# Check if hook exists
Test-Path .git\hooks\pre-commit

# Re-run setup
.\setup-hooks.ps1
```

### Problem: Hook reject commit tapi README sudah update
**Solution:**
```bash
# Pastikan README di-stage
git add README.md

# Check status
git status

# Commit ulang
git commit -m "your message"
```

### Problem: Butuh commit urgent tanpa update README
**Solution:**
```bash
# Use --no-verify (hati-hati!)
git commit --no-verify -m "urgent fix"

# JANGAN LUPA update README di commit berikutnya!
```

## 📚 Resources

- [Writing Good Documentation](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/)
- [README Best Practices](https://github.com/jehna/readme-best-practices)
- [Git Hooks Guide](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

## ✨ Benefits

1. ✅ **Always Up-to-Date Docs** - README never outdated
2. ✅ **Better Onboarding** - New developers get accurate info
3. ✅ **Professional Image** - Shows attention to detail
4. ✅ **Easier Maintenance** - Changes documented immediately
5. ✅ **Better Collaboration** - Team knows what changed

---

**Remember:** Good documentation is as important as good code! 📝✨
