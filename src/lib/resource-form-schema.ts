import * as z from "zod";

export const resourceFormSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email(),


  whatsapp: z.string().min(10, "Nomor WhatsApp minimal 10 digit").optional().or(z.literal("")),
  type: z.enum(["company", "freelancer", "student", "other"], {
    message: "Pilih salah satu",
  }),
});
