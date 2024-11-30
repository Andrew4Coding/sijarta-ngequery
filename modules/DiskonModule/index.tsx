"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { Voucher } from "./interface";
import { VoucherSection } from "./sections/Voucher";
import { PromoSection } from "./sections/Promo";

export const DiskonModule = () => {
  const [voucherData, setVoucherData] = useState<Voucher[]>([]);
  const [promoData, setPromoData] = useState<any[]>([]); // Assuming promo data is an array
  const [userDataState, setUserDataState] = useState<any>({});
  const { userData } = useUserData();
  const hasFetchedUserData = useRef(false);

  const fetchVouchers = async () => {
    if (!userData.id) return;
    const response = await fetch(`/api/diskon/voucher?id=${userData.id}`);
    const responseData = await response.json();
    
    // Fetch potongan and mintrpemesanan for each voucher
    const updatedVouchers = await Promise.all(
      responseData.data.map(async (voucher: Voucher) => {
        const diskonResponse = await fetch(`/api/diskon/detailDiskon?kode=${voucher.kode}`);
        const diskonData = await diskonResponse.json();
        
        if (diskonData.success) {
          const { potongan, mintrpemesanan } = diskonData.data;
          return { ...voucher, potongan, mintrpemesanan };
        }
        return voucher; // Return voucher without changes if no details are found
      })
    );
    setVoucherData(updatedVouchers);
  };

  const fetchPromo = async () => {
    const response = await fetch(`/api/diskon/promo`); // Endpoint for fetching promos
    const responseData = await response.json();
    setPromoData(responseData.data);
  };

  const fetchUserProfile = async () => {
    if (!userData.id) return;
    const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pengguna`);
    const data = await response.json();
    setUserDataState(data.data);
  };

  useEffect(() => {
    if (userData.id && !hasFetchedUserData.current) {
      fetchUserProfile();
      fetchVouchers();
      fetchPromo();
      hasFetchedUserData.current = true;
    }
  }, [userData]);

  return (
    <div className="w-full max-w-[1281px] mx-auto py-16 flex flex-col items-center gap-12 mt-20">
      <h1 className="text-[#1ab35f] text-6xl font-[Newake] tracking-[3px] text-center">Diskon</h1>
      <VoucherSection
        voucherData={voucherData}
        userDataState={userDataState}
        fetchUserProfile={fetchUserProfile}
        fetchVouchers={fetchVouchers}
      />
      <PromoSection promoData={promoData} />
    </div>
  );
};
