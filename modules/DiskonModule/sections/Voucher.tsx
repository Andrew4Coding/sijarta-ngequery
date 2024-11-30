"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Voucher } from "../interface";

export const VoucherSection = ({
    voucherData,
    userDataState,
    fetchUserProfile,
    fetchVouchers,
}: {
    voucherData: Voucher[];
    userDataState: any;
    fetchUserProfile: () => Promise<void>;
    fetchVouchers: () => Promise<void>;
}) => {
    const beliVoucher = async (voucherCode: string, price: number) => {
        if (Number(userDataState.saldompay!) < price) {
            alert("Saldo tidak cukup!");
            return;
        }

        // Now we have potongan and mintrpemesanan directly from voucherData
        const voucher = voucherData.find((v) => v.kode === voucherCode);
        if (voucher) {
            const { potongan, mintrpemesanan } = voucher;
            const purchaseResponse = await fetch("/api/diskon/beliVoucher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userDataState.id,
                    voucherCode,
                    paymentMethodId: 1,
                    potongan,
                    mintrpemesanan,
                }),
            });

            const data = await purchaseResponse.json();
            if (data.success) {
                alert("Voucher berhasil dibeli!");
                await fetchUserProfile();
                await fetchVouchers();
            } else {
                alert(data.message || "Terjadi kesalahan.");
            }
        } else {
            alert("Voucher not found.");
        }
    };

    return (
        <div className="w-full p-12 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-10">
            <div className="p-2 bg-[#1ab35f] rounded-xl pl-5">
                <h2 className="text-white text-[32px] font-bold">Voucher</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[34px]">
                {voucherData.map((voucher, index) => (
                    <div key={index} className="flex flex-col w-full max-w-sm">
                        <div className="px-2.5 py-4 bg-[#e8f7ef] rounded-t-[20px] flex justify-center items-center">
                            <h3 className="text-[#1ab35f] text-2xl font-bold">{voucher.kode}</h3>
                        </div>
                        <div className="p-5 bg-white rounded-b-[20px] border border-[#d9d9d9] flex flex-col gap-4">
                            {/* Display potongan and mintrpemesanan */}
                            <div className="flex justify-between">
                                <span className="text-black text-base">Potongan</span>
                                <span className="text-[#1ab35f] text-base">{voucher.potongan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black text-base">Min Transaksi Pemesanan</span>
                                <span className="text-[#1ab35f] text-base">Rp {voucher.mintrpemesanan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black text-base">Jumlah Hari Berlaku</span>
                                <span className="text-[#1ab35f] text-base">{voucher.jmlhariberlaku} Hari</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black text-base">Kuota Penggunaan</span>
                                <span className="text-[#1ab35f] text-base">{voucher.kuotapelangganan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black text-base">Harga</span>
                                <span className="text-[#1ab35f] text-base">Rp {voucher.harga}</span>
                            </div>
                            <Dialog>
                                <DialogTrigger
                                    className={`mt-4 w-full py-2 rounded-lg text-sm hover:bg-[#159e54] transition-all ${
                                    (userDataState?.saldompay ?? 0) >= voucher.harga
                                        ? "bg-[#1ab35f] text-white"
                                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                                    onClick={() => {
                                        if ((userDataState?.saldompay ?? 0) >= voucher.harga) {
                                            beliVoucher(voucher.kode, voucher.harga);
                                        }
                                    }}
                                    disabled={(userDataState?.saldompay ?? 0) < voucher.harga}
                                >
                                    Beli Voucher
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
