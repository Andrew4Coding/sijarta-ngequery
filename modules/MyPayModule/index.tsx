import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { dummyData } from "./const";
import { Button } from "@/components/ui/button";

export const MyPayModule = () => {
  return (
    <main className="min-h-screen flex justify-center items-center py-[10vh]">
      <div className="bg-transparent border-2 border-black/20 shadow-xl rounded-[24px] w-[90%] md:w-[80%] h-[800px] px-5 md:px-10 py-3 md:py-6 flex flex-col items-center justify-center">
        <h1 className="md:text-[60px] text-4xl text-center font-bold">MyPay</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-5 md:mt-8 mb-4">
          {dummyData
            .reduce(
              (acc, curr) =>
                curr.type === "TopUp MyPay"
                  ? acc + curr.amount
                  : acc - curr.amount,
              0
            )
            .toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
        </h2>
        <Link href={'/transaksi'}>
          <Button className="mb-6">Lakukan Transaksi</Button>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 h-[700px] overflow-y-scroll overflow-x-visible w-full">
          {dummyData.map((item, index) => {
            const date = new Date(item.date.toISOString()).toLocaleDateString(
              "en-US",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            );
            const hours = new Date(item.date.toISOString()).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );
            return (
              <React.Fragment key={item.id}>
                {index === 0 ||
                (index > 0 &&
                  dummyData[index - 1].date.getDate() !==
                    item.date.getDate()) ? (
                  <div className="md:col-span-2 md:text-center text-gray-700 text-base md:text-xl font-bold mt-4">
                    {date}
                  </div>
                ) : null}
                <div
                  className={cn(
                    "rounded-lg bg-red-50 px-2 md:px-6 py-4 shadow-lg flex justify-between items-center hover:scale-105 transition-transform md:mx-6",
                    { "bg-blue-50": item.type === "TopUp MyPay" }
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <p
                      className={cn(
                        "text-[14px] md:text-2xl font-semibold text-red-500",
                        {
                          "text-green-500": item.type === "TopUp MyPay",
                        }
                      )}
                    >
                      {item.amount.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                    <p className="text-[12px] md:text-base text-gray-500 font-semibold">
                      {hours}
                    </p>
                  </div>
                  <p className="text-[12px] md:text-xl font-bold text-[#1f1e1eb7]">
                    {item.type}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
};
