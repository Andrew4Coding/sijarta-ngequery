"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "@/components/ui/InputForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  noRekening: z.string().min(10, {
    message: "Nomor Rekening harus lebih dari 10 karakter",
  }),
  nominal: z.number().min(1, {
    message: "Nominal harus lebih dari 0",
  }),
});
export const Withdrawal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <InputForm
            label="Nomor Rekening"
            name="noRekening"
            description="Masukan Nomor Rekening"
            placeholder="1234567890"
            form={form}
          />
          <InputForm
            label="Nominal"
            name="nominal"
            description="Masukan Nominal Top Up"
            placeholder="100000"
            type="number"
            form={form}
          />
          <Button type="submit">Withdraw</Button>
        </form>
      </Form>
    </div>
  );
};
