import * as z from "zod";

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  company: z.string().optional(),
  employees: z.string().min(1, "Pilih salah satu").optional(),
  message: z.string().min(5, "Pesan terlalu singkat"),
  agree: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui kebijakan ini",
  }),
});
