"use client";
import { Button } from "@/components/ui/button";
import { BayarCombobox } from "./BayarCombobox";
import { useState } from "react";
import { dummyBayarTransaksiData } from "../const";

export const BayarTransaksi = () => {
  const [value, setValue] = useState("");

  function onSubmit(values: string) {
    console.log(values);
  }

  return (
    <div>
      <form
        onSubmit={() => onSubmit(value)}
        className="flex flex-col gap-5"
      >
        <h1 className="font-bold text-center text-[20px]">Pilih Tagihan</h1>
        <BayarCombobox value={value} setValue={setValue} />
        {value !== "" && (
          <>
            {dummyBayarTransaksiData
              .filter((data) => data.id === value)
              .map((data) => (
                <div
                  key={data.id}
                  className="flex flex-col gap-3 border border-[#D9D9D9] rounded-[12px] px-5 py-5"
                >
                  <p className="font-semibold">
                    Nominal:{" "}
                    <span className="text-red-500">
                      {data.amount.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </p>
                  <p className="font-semibold">Kategori: {data.kategori}</p>
                  <p className="font-semibold">
                    Tanggal: {" "}
                     {new Date(data.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                     })}
                  </p>
                </div>
              ))}
          </>
        )}
        <Button variant={'secondary'} type="submit">Bayar</Button>
      </form>
    </div>
  );
};
