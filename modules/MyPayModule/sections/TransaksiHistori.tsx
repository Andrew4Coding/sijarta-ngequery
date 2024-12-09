import { cn } from "@/lib/utils";
import React from "react";
import { PaymentHistoryInterface } from "../interface";

export const TransaksiHistori = ({
  historyData,
}: {
  historyData: PaymentHistoryInterface[];
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 pb-2 h-fit overflow-y-scroll pr-2 overflow-x-visible w-full">
      {historyData.map((item, index) => {
        const date = new Date(item.tanggal).toLocaleDateString(
          "id-ID",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
        return (
          <React.Fragment key={item.id}>
            {index === 0 ||
            (index > 0 &&
              new Date(historyData[index - 1].tanggal).getDate() !== new Date(item.tanggal).getDate()) ? (
              <div className="xl:col-span-2 h-fit bg-green-500 rounded-[12px] p-5 text-white text-xl md:text-2xl font-bold mt-4">
                {date}
              </div>
            ) : null}
            <div
              className={cn(
                "rounded-lg bg-transparent h-fit border border-[#FFCDCD] px-2 xl:px-10 py-6 shadow-sm flex justify-between items-center hover:scale-105 duration-300 xl:mx-4 2xl:mx-6",
                { "border-green-100": item.kategori === "TopUp MyPay" || item.kategori === "Terima Transfer" || item.kategori === "Menerima Honor Transaksi Jasa" || item.kategori === "Pengembalian Dana" }
              )}
            >
              <div className="flex flex-col gap-2">
                <p
                  className={cn(
                    "text-sm md:text-xl font-semibold text-[#F27575]",
                    {
                      "text-green-500": item.kategori === "TopUp MyPay" || item.kategori === "Terima Transfer" || item.kategori === "Menerima Honor Transaksi Jasa" || item.kategori === "Pengembalian Dana",
                    }
                  )}
                >
                  {Number(item.nominal).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
              <p className="text-sm text-end md:text-[20px] font-medium text-black">
                {item.kategori}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
