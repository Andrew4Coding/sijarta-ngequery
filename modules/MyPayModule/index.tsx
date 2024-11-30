"use client";
import React, { useEffect, useState } from "react";
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
import { ResponseInterface, PaymentHistoryInterface } from "./interface";

export const MyPayModule = ({
  userData,
}: {
  userData: { id: string; role: string };
}) => {
  const [saldo, setSaldo] = useState("0");
  const [historyTransaksi, setHistoryTransaksi] = useState<
    PaymentHistoryInterface[]
  >([]);

  const fetchData = async () => {
    const response = await fetch(`/api/mypay?id=${userData.id}`);

    if (response.ok) {
      const responseData = await response.json();
      const data: ResponseInterface = responseData.data;
      setSaldo(
        Number(data.saldo).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })
      );
      setHistoryTransaksi(data.trHistory);
    } else {
      const error = await response.json();
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-52 z-10">
      <div className="absolute top-0 w-full h-full z-[1]">
        <Image src="/images/MyPayBG.png" alt="MyPay" fill className="" />
      </div>
      <h1 className="md:text-[60px] text-4xl text-center text-green-500 shadow-header font-newake z-10">
        MyPay
      </h1>
      <div className="grid z-10">
        <h2 className="text-[24px] md:text-[32px] text-center font-bold text-white  bg-green-500 px-8 py-6 rounded-[50px] mt-8 mb-3">
          {saldo}
        </h2>
        <Dialog>
          <DialogTrigger className="bg-white border border-[#D9D9D9] hover:shadow-lg transition-all text-black text-base md:text-[24px] px-8 py-6 rounded-[50px]">
            <p className="mx-auto">Lakukan Transaksi</p>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[850px] rounded-[20px]">
            <DialogHeader>
              <DialogTitle className="text-center text-green-500 font-bold text-[24px]">
                Transaksi
              </DialogTitle>
            </DialogHeader>
            <Transaksi saldo={saldo} userId={userData.id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white z-10 border border-[#D9D9D9] mt-[50px] rounded-[24px] w-[90%] md:w-[80%] h-[1100px] p-6 md:p-12 flex flex-col">
        {historyTransaksi.length === 0 ? (
          <h1 className="text-[40px] text-center font-bold text-gray-400">
            Anda belum melakukan transaksi menggunakan MyPay
          </h1>
        ) : (
          <TransaksiHistori historyData={historyTransaksi} />
        )}
      </div>
    </main>
  );
};
