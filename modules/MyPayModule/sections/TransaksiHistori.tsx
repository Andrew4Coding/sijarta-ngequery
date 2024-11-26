import { cn } from "@/lib/utils";
import React from "react";
import { dummyData } from "../const";

export const TransaksiHistori = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-8 h-full overflow-y-scroll pr-2 overflow-x-visible w-full">
      {dummyData.map((item, index) => {
        const date = new Date(item.date.toISOString()).toLocaleDateString(
          "id-ID",
          {
            day: "2-digit",
            month: "2-digit",
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
              dummyData[index - 1].date.getDate() !== item.date.getDate()) ? (
              <div className="xl:col-span-2 bg-green-500 rounded-[12px] p-5 text-white text-[24px] md:text-[32px] font-bold mt-4">
                {date}
              </div>
            ) : null}
            <div
              className={cn(
                "rounded-lg bg-transparent border border-[#FFCDCD] px-2 xl:px-10 py-6 shadow-sm flex justify-between items-center hover:scale-105 duration-300 xl:mx-6",
                { "border-green-100": item.type === "TopUp MyPay" }
              )}
            >
              <div className="flex flex-col gap-2">
                <p
                  className={cn(
                    "text-sm md:text-xl font-semibold text-[#F27575]",
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
                <p className="text-sm md:text-[20px] text-black">
                  {hours}
                </p>
              </div>
              <p className="text-sm text-end md:text-[20px] font-medium text-black">
                {item.type}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
