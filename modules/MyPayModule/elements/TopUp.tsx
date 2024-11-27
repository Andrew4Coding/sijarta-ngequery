"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "@/components/ui/InputForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nominal: z.string().refine((val) => parseInt(val) > 0, {
    message: "Nominal harus lebih dari 0",
  }),
});

export const TopUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
          <Button variant={'secondary'} type="submit">Top Up</Button>
        </form>
      </Form>
    </div>
  );
};
