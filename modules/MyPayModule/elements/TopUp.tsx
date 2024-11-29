"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "@/components/ui/InputForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner"
import { useState } from "react";

const formSchema = z.object({
  nominal: z.string().refine((val) => parseInt(val) > 0, {
    message: "Nominal harus lebih dari 0",
  }),
});

export const TopUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, role } = useUserData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    toast.loading("Loading...");
    const response = await fetch("/api/mypay/transaksi", {
      method: "POST",
      body: JSON.stringify({
        userId: userData.id,
        role,
        category: "TopUp MyPay",
        nominal: parseInt(values.nominal),
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      setIsLoading(false);
      toast.success(responseData.data.message);
    } else {
      const error = await response.json();
      setIsLoading(false);
      toast.error(error.error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <InputForm
            label="Nominal"
            name="nominal"
            description="Masukan Nominal Top Up"
            placeholder="100000"
            type="number"
            form={form}
          />
          <Button disabled={isLoading} variant={"secondary"} type="submit">
            Top Up
          </Button>
        </form>
      </Form>
    </div>
  );
};
