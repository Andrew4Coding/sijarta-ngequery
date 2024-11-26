import React from "react";
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
import Image from "next/image";

export const MyPayModule = () => {
  const saldo = dummyData
    .reduce(
      (acc, curr) =>
        curr.type === "TopUp MyPay" ? acc + curr.amount : acc - curr.amount,
      0
    )
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-52 z-10">
      <div className="absolute top-0 w-full h-full z-[1]">
        <Image
          src="/images/MyPayBG.png"
          alt="MyPay"
          fill
          className=""
        />
      </div>
      <h1 className="md:text-[60px] text-4xl text-center text-green-500 shadow-header font-newake z-10">
        MyPay
      </h1>
      <div className="grid z-10">
        <h2 className="text-[24px] md:text-[32px] font-bold text-white  bg-green-500 px-8 py-6 rounded-[50px] mt-8 mb-3">
          {saldo}
        </h2>
        <Dialog>
          <DialogTrigger className="bg-white border border-[#D9D9D9] hover:shadow-lg transition-all text-black text-base md:text-[24px] px-8 py-6 rounded-[50px]">
            <p className="mx-auto">Lakukan Transaksi</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Transaksi</DialogTitle>
            </DialogHeader>
            <Transaksi saldo={saldo} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white z-10 border border-[#D9D9D9] mt-[50px] rounded-[24px] w-[90%] md:w-[80%] h-[1100px] p-6 md:p-12 flex flex-col items-center justify-center">
        <TransaksiHistori />
      </div>
    </main>
  );
};
