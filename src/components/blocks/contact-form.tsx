"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  company: z.string().optional(),
  whatsapp: z.string().regex(/^\+?[0-9]{8,20}$/, { message: "Format nomor WhatsApp tidak valid" }),
  employees: z.string().optional(),
  message: z.string().min(5, { message: "Pesan terlalu singkat" }),
  agree: z.literal(true, { message: "Anda harus menyetujui syarat & ketentuan" }),
});

type Schema = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      whatsapp: "",
      employees: "",
      message: "",
      agree: false,
    } as unknown as Schema,
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return null;
    }

    const token = await executeRecaptcha('contactFormSubmit');
    return token;
  }, [executeRecaptcha]);

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    setSubmitError("");
    setIsExecuting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA tidak tersedia. Harap muat ulang halaman.");
      }
      const token = await handleReCaptchaVerify();

      if (!token) {
        throw new Error("Gagal mendapatkan token verifikasi reCAPTCHA.");
      }

      // Map frontend values to backend expected payload
      const payload = {
        token,
        name: data.name,
        business: data.company,
        whatsapp: data.whatsapp,
        challenge: data.message,
        challenge_label: data.employees,
      };

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Gagal mengirim pesan.");
      }

      setHasSucceeded(true);
      form.reset();
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "Terjadi kesalahan saat mengirim formulir.");
    } finally {
      setIsExecuting(false);
    }
  });

  if (hasSucceeded) {
    return (
      <div className="w-full gap-2 rounded-md border p-2 sm:p-5 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full px-3 py-6"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mx-auto mb-4 flex w-fit justify-center rounded-full border p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="mb-2 text-center text-2xl font-bold text-pretty">
            Terima kasih
          </h2>
          <p className="text-muted-foreground text-center text-lg text-pretty">
            Formulir berhasil dikirim, kami akan segera menghubungi Anda
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 space-y-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nama lengkap * </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                  placeholder="Nama lengkap Anda"
                  disabled={isExecuting}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Alamat email * </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                  placeholder="email@perusahaan.com"
                  disabled={isExecuting}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nomor WhatsApp * </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                  placeholder="Contoh: 08123456789"
                  disabled={isExecuting}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nama perusahaan </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                  placeholder="Nama perusahaan"
                  disabled={isExecuting}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => {
            const options = [
              { value: "1", label: "1" },
              { value: "2-10", label: "2-10" },
              { value: "11-50", label: "11-50" },
              { value: "51-500", label: "51-500" },
            ];
            return (
              <FormItem className="w-full">
                <FormLabel>Jumlah karyawan </FormLabel>
                <Select disabled={isExecuting} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih ukuran perusahaan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan Anda * </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ceritakan masalah atau kebutuhan Anda terkait otomatisasi"
                  disabled={isExecuting}
                  className="resize-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-1">
              <FormControl>
                <Checkbox
                  disabled={isExecuting}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Saya menyetujui syarat dan ketentuan</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {submitError && (
          <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-md border border-red-200">
            {submitError}
          </div>
        )}

        <div className="flex w-full items-center justify-end pt-3">
          <Button disabled={isExecuting || !executeRecaptcha} className="rounded-lg" size="sm">
            {isExecuting ? "Mengirim..." : !executeRecaptcha ? "Mempersiapkan..." : "Kirim"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
