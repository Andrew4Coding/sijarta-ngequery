"use client";
import React, { useState } from "react";
import { KategoriCombobox } from "../elements/KategoriCombobox";
import { TopUp } from "../elements/TopUp";
import { Withdrawal } from "../elements/Withdrawal";
import { Transfer } from "../elements/Transfer";
import { BayarTransaksi } from "../elements/BayarTransaksi";

export const Transaksi = ({ saldo }: { saldo: string }) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col font-dmsans">
      <p className="font-semibold">
        Saldo kamu: <span className="text-green-700">{saldo}</span>
      </p>
      <KategoriCombobox value={value} setValue={setValue} />
      {value === "TopUp MyPay" && <TopUp />}
      {value === "Withdrawal" && <Withdrawal />}
      {value === "Transfer MyPay" && <Transfer />}
      {value === "Membayar Transaksi" && <BayarTransaksi />}
      {value === "" && <p className="text-center font-medium text-gray-400 text-lg">Tidak ada kategori yang dipilih.</p>}
    </div>
  );
};
