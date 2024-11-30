"use client";

import React from "react";
import { Promo } from "../interface";
import { dateConverter } from "../../EditProfileModule";  

export const PromoSection = ({ promoData }: { promoData: Promo[] }) => {
  return (
    <div className="w-full max-w-[1280px] p-12 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col justify-start items-start gap-10">
      <div className="self-stretch p-2 bg-[#1ab35f] rounded-xl pl-5">
        <div className="text-white text-[32px] font-bold">Promo</div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-5">
        {promoData.length > 0 ? (
          // Wrapper for two promos per row
          <div className="grid grid-cols-2 gap-5 w-full">
            {promoData.map((promo, index) => (
              <div key={index} className="w-full flex items-start gap-5">
                <div className="w-full h-[57px] p-5 bg-white rounded-xl border border-[#d9d9d9] flex justify-between items-center gap-3">
                  <div className="text-black text-2xl font-bold">{promo.kode}</div>
                  <div className="text-[#1ab35f] text-xl font-normal">
                    {dateConverter(promo.tglakhirberlaku)} 
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="self-stretch flex items-start gap-5">
            <div className="grow h-[57px] p-5 bg-white rounded-xl border border-[#d9d9d9] flex justify-center items-center">
              <div className="text-gray-500">No promo available</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
