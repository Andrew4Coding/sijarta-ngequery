"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PelangganType, UserType } from "@/database/types";
import { useUserData } from "@/hooks/useUserData";
import { useEffect, useState } from "react";

export interface Voucher {
  code: string;
  discount: string;
  minTransaction: number;
  validity: string;
  quota: string;
  price: number;
}

export const DiskonModule = () => {
  const voucherData: Voucher[] = [
    { code: "DISKON50", discount: "50%", minTransaction: 100000, validity: "30 Hari", quota: "10x", price: 50000 },
    { code: "DISKON30", discount: "30%", minTransaction: 75000, validity: "15 Hari", quota: "5x", price: 30000 },
    { code: "DISKON20", discount: "20%", minTransaction: 50000, validity: "7 Hari", quota: "2x", price: 20000 },
  ];

  const [userDataState, setUserDataState] = useState<PelangganType & UserType>({} as PelangganType & UserType);
  const { userData } = useUserData();

  async function fetchUserProfile() {
    const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pekerja`);
    const data = await response.json();
    setUserDataState(data.data);
  }

  useEffect(() => {
    if (userData.id) fetchUserProfile();
  }, [userData]);

  return (
    <div className="w-full max-w-[1281px] mx-auto py-16 flex flex-col items-center gap-12 mt-20">
      <h1 className="text-[#1ab35f] text-6xl font-[Newake] tracking-[3px] text-center">Diskon</h1>

      {/* Voucher Section */}
      <div className="w-full p-12 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-10">
        <div className="p-2 bg-[#1ab35f] rounded-xl pl-5">
          <h2 className="text-white text-[32px] font-bold">Voucher</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[34px]">
          {voucherData.map((voucher, index) => (
            <div key={index} className="flex flex-col w-full max-w-sm">
              {/* Voucher Header */}
              <div className="px-2.5 py-4 bg-[#e8f7ef] rounded-t-[20px] flex justify-center items-center">
                <h3 className="text-[#1ab35f] text-2xl font-bold">{voucher.code}</h3>
              </div>

              {/* Voucher Details */}
              <div className="p-5 bg-white rounded-b-[20px] border border-[#d9d9d9] flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="text-black text-base">Potongan</span>
                  <span className="text-[#1ab35f] text-base">{voucher.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">Min Transaksi Pemesanan</span>
                  <span className="text-[#1ab35f] text-base">Rp {voucher.minTransaction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">Jumlah Hari Berlaku</span>
                  <span className="text-[#1ab35f] text-base">{voucher.validity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">Kuota Penggunaan</span>
                  <span className="text-[#1ab35f] text-base">{voucher.quota}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">Harga</span>
                  <span className="text-[#1ab35f] text-base">Rp {voucher.price}</span>
                </div>

                {/* Buy Voucher Button */}
                <Dialog>
                  <DialogTrigger className="mt-4 w-full bg-[#1ab35f] text-white py-2 rounded-lg text-sm hover:bg-[#159e54] transition-all">
                    Beli Voucher
                  </DialogTrigger>
                  <DialogContent className="w-[682px] max-w-none overflow-y-auto max-h-[500px]"> 
                    <DialogHeader>
                      <DialogTitle className={`text-center text-${(userDataState?.saldompay ?? 0) >= voucher.price ? 'green' : 'red'}-500 text-2xl font-bold`}>
                        {(userDataState?.saldompay ?? 0) >= voucher.price ? 'SUKSES' : 'GAGAL'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-full flex flex-col gap-10">
                      {/* Success Dialog */}
                      {(userDataState?.saldompay ?? 0) >= voucher.price ? (
                        <>
                          <div className="self-stretch text-center text-black text-xl font-medium  leading-tight">
                            Selamat! Anda berhasil membeli voucher!
                          </div>
                          <div className="self-stretch justify-start items-start gap-3 inline-flex">
                            <div className="w-[198px] flex-col justify-center items-center gap-2 inline-flex">
                              <div className="self-stretch text-[#1ab35f] text-base font-medium ">Kode</div>
                              <div className="self-stretch px-4 py-5 bg-[#e8f7ef] rounded-xl justify-start items-center gap-2.5 inline-flex">
                                <div className="grow shrink basis-0 text-black text-xl font-medium">{voucher.code}</div>
                              </div>
                            </div>
                            <div className="w-[198px] flex-col justify-center items-center gap-2 inline-flex">
                              <div className="self-stretch text-[#1ab35f] text-base font-medium ">Jumlah Hari Berlaku</div>
                              <div className="self-stretch px-4 py-5 bg-[#e8f7ef] rounded-xl justify-start items-center gap-2.5 inline-flex">
                                <div className="grow shrink basis-0 text-black text-xl font-medium">{voucher.validity}</div>
                              </div>
                            </div>
                            <div className="w-[198px] flex-col justify-center items-center gap-2 inline-flex">
                              <div className="self-stretch text-[#1ab35f] text-base font-medium ">Kuota Penggunaan</div>
                              <div className="self-stretch px-4 py-5 bg-[#e8f7ef] rounded-xl justify-start items-center gap-2.5 inline-flex">
                                <div className="grow shrink basis-0 text-black text-xl font-medium">{voucher.quota}</div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        // Failure Dialog
                        <>
                          <div className="text-center text-black text-xl font-medium leading-[30px]">
                            Maaf, saldo Anda tidak cukup untuk membeli voucher ini.
                            <br />
                            Silakan top-up saldo Anda.
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>


              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="w-full max-w-[1280px] p-12 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col justify-start items-start gap-10">
        <div className="self-stretch p-2 bg-[#1ab35f] rounded-xl justify-start items-center gap-2.5 inline-flex pl-5">
          <div className="grow shrink basis-0 text-white text-[32px] font-bold">Promo</div>
        </div>
        <div className="self-stretch h-[211px] flex-col justify-start items-start gap-5 flex">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="grow shrink basis-0 h-[57px] p-5 bg-white rounded-xl border border-[#d9d9d9] justify-start items-center gap-3 flex">
                <div className="grow shrink basis-0 text-black text-2xl font-bold">PROMO10</div>
                <div className="text-[#1ab35f] text-1xl font-normal">31/12/2024</div>
              </div>
              <div className="grow shrink basis-0 h-[57px] p-5 bg-white rounded-xl border border-[#d9d9d9] justify-start items-center gap-3 flex">
                <div className="grow shrink basis-0 text-black text-2xl font-bold">PROMO10</div>
                <div className="text-[#1ab35f] text-1xl font-normal">31/12/2024</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiskonModule;
