"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "@/components/ui/InputForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";
import { BankCombobox } from "./BankCombobox";

const formSchema = z.object({
  noRekening: z.string().min(10, {
    message: "Nomor Rekening harus lebih dari 10 karakter",
  }),
  namaBank: z.string().min(1, { message: "Nama Bank harus diisi" }),
  nominal: z.string().refine((val) => parseInt(val) > 0, {
    message: "Nominal harus lebih dari 0",
  }),
});
export const Withdrawal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
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
        category: "Withdrawal",
        nominal: parseInt(values.nominal),
        bankAccount: values.noRekening,
        bankName: values.namaBank,
      }),
    });

    const result = await response.json();
    toast.promise(
      response.ok
        ? Promise.resolve(result.message)
        : Promise.reject(result.error),
      {
        loading: "Loading...",
        success: "Withdrawal Success",
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
          <BankCombobox
            value={value}
            setValue={(value) => {
              form.setValue("namaBank", value);
              setValue(value);
            }}
          />
          {form.formState.errors.namaBank && (
            <p className="text-xs font-medium text-red-500">
              {form.formState.errors.namaBank.message}
            </p>
          )}
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
          <Button disabled={isLoading} variant={"secondary"} type="submit">
            Withdraw
          </Button>
        </form>
      </Form>
    </div>
  );
};
