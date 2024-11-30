"use client";
import React, { useState } from "react";
import { KategoriCombobox } from "../elements/KategoriCombobox";
import { TopUp } from "../elements/TopUp";
import { Withdrawal } from "../elements/Withdrawal";
import { Transfer } from "../elements/Transfer";
import { BayarTransaksi } from "../elements/BayarTransaksi";
import { useUserData } from "@/hooks/useUserData";

export const Transaksi = ({ saldo, userId }: { saldo: string, userId: string }) => {
  const { userData, role } = useUserData();
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 font-medium text-[20px] w-full text-center">
        <div className="p-5 border border-[#D9D9D9] rounded-l-[12px]">{userData.nama}</div>
        <div className="p-5 border border-l-0 border-[#D9D9D9] rounded-r-[12px] bg-green-50">Saldo: <span className="font-bold">{saldo}</span></div>
      </div>
      <KategoriCombobox
        value={value}
        setValue={setValue}
        isPelanggan={role === "pelanggan"}
      />
      {value === "TopUp MyPay" && <TopUp />}
      {value === "Withdrawal" && <Withdrawal />}
      {value === "Transfer MyPay" && <Transfer />}
      {value === "Membayar Transaksi" && role === "pelanggan" && (
        <BayarTransaksi userId={userId} />
      )}
      {value === "" && (
        <p className="text-center font-medium text-gray-400 text-lg my-6">
          Tidak ada kategori yang dipilih.
        </p>
      )}
    </div>
  );
};
