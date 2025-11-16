# 📝 README Update Checklist

Setiap kali melakukan perubahan pada kode, pastikan untuk update `README.md`:

## ✅ Kapan Harus Update README?

### 1. **Menambah Fitur Baru**
- [ ] Tambahkan deskripsi fitur di section "Fitur Utama"
- [ ] Update roadmap jika fitur dari roadmap telah selesai
- [ ] Tambahkan dokumentasi komponen jika ada komponen baru

### 2. **Menambah Dependencies**
- [ ] Update tabel dependencies (Production/Development)
- [ ] Tambahkan penjelasan untuk dependency baru

### 3. **Perubahan Struktur Folder**
- [ ] Update diagram struktur proyek
- [ ] Jelaskan purpose dari folder/file baru

### 4. **Perubahan Konfigurasi**
- [ ] Update section konfigurasi (Tailwind, TypeScript, dll)
- [ ] Tambahkan code snippet jika perlu

### 5. **Deployment/Setup Changes**
- [ ] Update instruksi installation
- [ ] Update deployment guide

### 6. **Breaking Changes**
- [ ] Highlight di bagian atas README
- [ ] Update version di package.json
- [ ] Dokumentasikan migration guide

## 🤖 Git Hook

Git hook sudah disetup untuk mengingatkan Anda:
- File: `.git/hooks/pre-commit`
- Akan menolak commit jika ada perubahan code tanpa update README

## 💡 Tips

1. **Update README bersamaan dengan code changes**
2. **Keep README accurate dan up-to-date**
3. **Use clear and concise language**
4. **Add code examples untuk fitur kompleks**
5. **Update screenshots jika ada perubahan UI**

## 🚫 Bypass Hook (Not Recommended)

Jika dalam kondisi emergency dan perlu skip check:
```bash
git commit --no-verify -m "your message"
```

**Note:** Hanya gunakan `--no-verify` untuk changes yang benar-benar tidak memerlukan README update (typo fixes, minor formatting, dll).
