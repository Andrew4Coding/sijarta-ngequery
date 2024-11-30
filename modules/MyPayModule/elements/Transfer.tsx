"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "@/components/ui/InputForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  noHp: z
    .string()
    .min(10, {
      message: "Nomor HP harus lebih dari 10 karakter",
    })
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, {
      message: "Nomor HP tidak valid",
    }),
  nominal: z.string().refine((val) => parseInt(val) > 0, {
    message: "Nominal harus lebih dari 0",
  }),
});

export const Transfer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, role } = useUserData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await fetch("/api/mypay/transaksi", {
      method: "POST",
      body: JSON.stringify({
        userId: userData.id,
        role,
        category: "Transfer MyPay",
        nominal: parseInt(values.nominal),
        noHp: values.noHp,
      }),
    });

    const result = await response.json();
    toast.promise(
      response.ok
        ? Promise.resolve(result.message)
        : Promise.reject(result.error),
      {
        loading: "Loading...",
        success: "Transfer Success",
        error: result.error,
      }
    );

    setIsLoading(false);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <InputForm
            label="Nomor HP"
            name="noHp"
            description="Masukan Nomor HP Penerima"
            placeholder="081234567890"
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
          <Button disabled={isLoading} variant={"secondary"} type="submit">
            Transfer
          </Button>
        </form>
      </Form>
    </div>
  );
};
