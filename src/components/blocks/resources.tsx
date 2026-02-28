"use client";

// ============================================================
// 📁 PANDUAN UPLOAD FILE BARU (sebagai Admin)
// Akses: /resources?admin=seriaflow-admin-2025
// Upload & delete langsung dari panel admin di halaman tersebut.
// Ubah token di file .env (PUBLIC_ADMIN_TOKEN)
// ============================================================

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Download,
  FileText,
  BookOpen,
  Zap,
  ArrowRight,
  Upload,
  Trash2,
  ShieldCheck,
  RefreshCw,
  FileX,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resourceFormSchema } from "@/lib/resource-form-schema";

type Schema = z.infer<typeof resourceFormSchema>;

// ============================================================
// Static resource display data (untuk public view)
// ============================================================
const STATIC_RESOURCES = [
  {
    title: "Panduan Automasi Bisnis untuk Pemula",
    description:
      "Pelajari 5 langkah praktis untuk mulai mengotomasi proses bisnis Anda hari ini.",
    icon: BookOpen,
    file: "/resources/panduan-automasi-bisnis-r7kX9mP2.pdf",
    tag: "PDF Guide",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Checklist: Apakah Bisnis Anda Siap untuk AI?",
    description:
      "10 pertanyaan kunci untuk menilai kesiapan bisnis Anda dalam mengadopsi AI.",
    icon: FileText,
    file: "/resources/checklist-ai-readiness-q4nL8vW5.pdf",
    tag: "Checklist",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Studi Kasus: Hemat 90% Waktu Rekonsiliasi Bank",
    description:
      "Bagaimana automasi mengubah proses rekonsiliasi dari berhari-hari menjadi hitungan menit.",
    icon: Zap,
    file: "/resources/studi-kasus-rekonsiliasi-j6bT3cE1.pdf",
    tag: "Case Study",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
];

// ============================================================
// Main Component — detects admin mode from URL
// ============================================================
export function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  useEffect(() => {
    // Check localStorage for returning visitors
    const savedLead = localStorage.getItem("seriaflow_lead");
    if (savedLead) setIsUnlocked(true);

    // Check URL for admin token
    const params = new URLSearchParams(window.location.search);
    const token = params.get("admin");
    const expectedToken = import.meta.env.PUBLIC_ADMIN_TOKEN;

    if (token && token === expectedToken) {
      setIsAdmin(true);
      setAdminToken(token);
    }
  }, []);

  if (isAdmin) {
    return <AdminPanel token={adminToken} />;
  }

  return (
    <section className="py-28 lg:pt-44 lg:pb-32">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-mono text-sm font-medium tracking-wider uppercase"
          >
            Free Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl tracking-tight md:text-4xl lg:text-5xl"
          >
            Belajar Automasi Gratis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed"
          >
            Download panduan, checklist, dan studi kasus dari project nyata.
            Cukup isi form singkat di bawah untuk mengakses semua resource.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LeadForm onSuccess={() => setIsUnlocked(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ResourceGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================
// Lead Capture Form
// ============================================================
function LeadForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<Schema>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: { name: "", email: "", whatsapp: "", type: undefined },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    setIsSubmitting(true);
    try {
      const WEBHOOK_URL = "";
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, source: "resources-page", timestamp: new Date().toISOString() }),
        });
      }
    } catch {
      console.warn("Webhook failed, unlocking anyway");
    }

    if (typeof window !== "undefined" && "gtag" in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "generate_lead", { event_category: "resources", event_label: data.type });
    }

    localStorage.setItem("seriaflow_lead", JSON.stringify(data));
    setIsSubmitting(false);
    onSuccess();
  });

  return (
    <div className="relative mx-auto max-w-lg">
      {/* Glow effect */}
      <div className="from-primary/20 to-primary/5 absolute -inset-1 rounded-2xl bg-gradient-to-r blur-xl" />
      <Card className="relative border-white/10">
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
              <Lock className="text-primary size-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Unlock Free Resources</h2>
              <p className="text-muted-foreground text-sm">
                Isi form singkat — data Anda aman & tidak akan di-spam.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama *</FormLabel>
                  <FormControl><Input {...field} placeholder="Nama lengkap Anda" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl><Input {...field} type="email" placeholder="email@perusahaan.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="whatsapp" render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp (opsional)</FormLabel>
                  <FormControl><Input {...field} placeholder="08xxxxxxxxxx" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Anda seorang... *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full"><SelectValue placeholder="Pilih yang sesuai" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="company">Pemilik / Karyawan Perusahaan</SelectItem>
                      <SelectItem value="freelancer">Freelancer / Konsultan</SelectItem>
                      <SelectItem value="student">Mahasiswa / Pelajar</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="mt-2 w-full gap-2" disabled={isSubmitting}>
                {isSubmitting ? "Membuka akses..." : (<>Akses Resources Gratis <ArrowRight className="size-4" /></>)}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// Public Resource Grid
// ============================================================
function ResourceGrid() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-4"
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20">
          <Check className="size-5 text-green-500" />
        </div>
        <p className="font-medium text-green-700 dark:text-green-400">
          Akses terbuka! Download semua resource di bawah — kami juga mengirimkan salinan ke email Anda.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {STATIC_RESOURCES.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 transition-opacity group-hover:opacity-100`} />
                <CardContent className="relative flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${resource.iconBg}`}>
                      <Icon className={`size-6 ${resource.iconColor}`} />
                    </div>
                    <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {resource.tag}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold leading-tight">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{resource.description}</p>
                  </div>
                  <Button variant="outline" className="w-full gap-2 group-hover:border-primary group-hover:text-primary" asChild>
                    <a href={resource.file} download target="_blank" rel="noopener noreferrer">
                      <Download className="size-4" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="text-muted-foreground mt-8 text-center text-sm">
        <p>
          Butuh solusi yang lebih spesifik?{" "}
          <a href="/contact" className="text-primary font-medium underline underline-offset-4">
            Konsultasi gratis dengan kami
          </a>
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Admin Panel (hanya untuk admin via ?admin=TOKEN)
// ============================================================
type UploadedFile = {
  filename: string;
  url: string;
  sizeKB: number;
  uploadedAt: string;
};

function AdminPanel({ token }: { token: string }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/resources?admin=${token}`);
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } catch {
      console.error("Failed to fetch files");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const handleUpload = async (file: File) => {
    if (!file.name.endsWith(".pdf")) {
      setUploadStatus({ type: "error", message: "Hanya file PDF yang diperbolehkan." });
      return;
    }
    setIsUploading(true);
    setUploadStatus(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`/api/resources?admin=${token}`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadStatus({ type: "success", message: `"${file.name}" berhasil diupload!` });
        await fetchFiles();
      } else {
        setUploadStatus({ type: "error", message: data.error || "Upload gagal." });
      }
    } catch {
      setUploadStatus({ type: "error", message: "Koneksi gagal." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    setDeletingFile(filename);
    try {
      const res = await fetch(`/api/resources/${encodeURIComponent(filename)}?admin=${token}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchFiles();
        setConfirmDelete(null);
      } else {
        alert(data.error || "Gagal menghapus file.");
      }
    } catch {
      alert("Koneksi gagal.");
    } finally {
      setDeletingFile(null);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  return (
    <section className="py-16 lg:pt-28 lg:pb-20">
      <div className="container max-w-4xl">
        {/* Admin Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10">
              <ShieldCheck className="size-6 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  ADMIN MODE
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Kelola file resource yang tersedia untuk publik</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchFiles} className="gap-2">
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>

        {/* Upload Zone */}
        <div
          className={`relative mb-8 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
          />
          <div className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl transition-colors ${isDragging ? "bg-primary/20" : "bg-muted"}`}>
            {isUploading
              ? <RefreshCw className="text-primary size-8 animate-spin" />
              : <Upload className={`size-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            }
          </div>
          <p className="text-foreground mb-1 text-lg font-semibold">
            {isUploading ? "Mengupload..." : isDragging ? "Lepaskan file di sini" : "Drag & drop atau klik untuk upload"}
          </p>
          <p className="text-muted-foreground text-sm">Hanya file PDF • Maksimal 20MB</p>

          <AnimatePresence>
            {uploadStatus && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 rounded-xl px-4 py-2.5 text-sm font-medium ${
                  uploadStatus.type === "success"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {uploadStatus.type === "success" ? "✅" : "❌"} {uploadStatus.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* File List */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">
              File di server{" "}
              <span className="text-muted-foreground font-normal">({files.length} file)</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border py-16 text-center">
              <FileX className="text-muted-foreground size-10" />
              <p className="text-muted-foreground">Belum ada file. Upload PDF pertama kamu di atas.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <motion.div
                  key={file.filename}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <FileText className="size-5 text-red-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{file.filename}</p>
                    <p className="text-muted-foreground text-xs">
                      {file.sizeKB} KB · Uploaded{" "}
                      {new Date(file.uploadedAt).toLocaleDateString("id-ID", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <Download className="size-4" />
                      </a>
                    </Button>

                    {confirmDelete === file.filename ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-red-500">Yakin?</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(file.filename)}
                          disabled={deletingFile === file.filename}
                        >
                          {deletingFile === file.filename ? <RefreshCw className="size-4 animate-spin" /> : "Hapus"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>
                          Batal
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => setConfirmDelete(file.filename)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Back to public view hint */}
        <div className="text-muted-foreground mt-8 text-center text-sm">
          <a href="/resources" className="underline underline-offset-4 hover:text-foreground transition-colors">
            ← Lihat tampilan publik
          </a>
        </div>
      </div>
    </section>
  );
}
