import React from "react";
import { cn } from "@/lib/utils";
import { dummyData } from "./const";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaksi } from "./sections/Transaksi";
import { TransaksiHistori } from "./sections/TransaksiHistori";
import {ShoppingBag} from 'lucide-react'

export const MyPayModule = () => {
  const saldo = dummyData
    .reduce(
      (acc, curr) =>
        curr.type === "TopUp MyPay" ? acc + curr.amount : acc - curr.amount,
      0
    )
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  return (
    <main className="min-h-screen flex justify-center items-center py-52 ">
      <div className="bg-transparent border-[1px] border-black/20 shadow-xl rounded-[24px] w-[90%] md:w-[80%] h-[800px] px-5 md:px-10 py-3 md:py-20 flex flex-col items-center justify-center">
        <h1 className="md:text-[60px] text-4xl text-center font-bold">MyPay</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-5 md:mt-8 mb-4">
          {saldo}
        </h2>
        <Dialog>
          <DialogTrigger className="bg-blue-50 border-2 hover:bg-blue-100 active:bg-blue-50 rounded-lg px-6 py-3 hover:shadow-lg transition-all font-semibold mb-10 flex gap-2">
            <ShoppingBag />
            Lakukan Transaksi
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Transaksi</DialogTitle>
            </DialogHeader>
            <Transaksi saldo={saldo} />
          </DialogContent>
        </Dialog>
        <TransaksiHistori />
      </div>
    </main>
  );
};
