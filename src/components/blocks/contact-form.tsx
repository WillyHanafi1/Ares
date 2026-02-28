"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


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
import { formSchema } from "@/lib/form-schema";

type Schema = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      employees: "",
      message: "",
      agree: false,
    } as unknown as Schema,
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);

  const handleSubmit = form.handleSubmit(async (_data: Schema) => {

    setIsExecuting(true);
    // Simulate API call
    setTimeout(() => {
      setIsExecuting(false);
      setHasSucceeded(true);
      form.reset();
    }, 1000);
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
          rules={{ required: true }}
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
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Alamat email * </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                  placeholder="email@perusahaan.com"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          rules={{ required: false }}
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
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          rules={{ required: false }}
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="misal: 11-50" />
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
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan Anda * </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tuliskan pesan Anda"
                  className="resize-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={{ required: true }}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Saya menyetujui syarat dan ketentuan</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-end pt-3">
          <Button className="rounded-lg" size="sm">
            {isExecuting ? "Mengirim..." : "Kirim"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
