import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Voucher } from "../interface";
import { v4 } from "uuid";

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
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null); // state untuk menyimpan voucher yang dipilih
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null); // Menyimpan status transaksi: 'sukses' atau 'gagal'

    const beliVoucher = async (voucher: Voucher) => {
        const price = voucher.harga;

        if (Number(userDataState.saldompay!) < price) {
            setTransactionStatus("gagal"); // Set status gagal jika saldo tidak cukup
            return;
        }

        const { potongan, mintrpemesanan } = voucher;
        const purchaseResponse = await fetch("/api/diskon/beliVoucher", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userDataState.id,
                voucherCode: voucher.kode,
                idmetodepembayaran: v4(),
                potongan,
                mintrpemesanan,
            }),
        });

        const data = await purchaseResponse.json();
        if (data.success) {
            setTransactionStatus("sukses"); // Set status sukses jika transaksi berhasil
            await fetchUserProfile();
            await fetchVouchers();
        } else {
            setTransactionStatus("gagal"); // Set status gagal jika transaksi gagal
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
                                    className="mt-4 w-full py-2 rounded-lg text-sm hover:bg-[#159e54] transition-all bg-[#1ab35f] text-white"
                                    onClick={() => {
                                        setSelectedVoucher(voucher); // Set voucher yang dipilih
                                        beliVoucher(voucher); // Panggil fungsi beliVoucher langsung
                                    }}
                                >
                                    Beli Voucher
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog untuk menampilkan status transaksi */}
            {transactionStatus && (
                <Dialog open={Boolean(transactionStatus)} onOpenChange={() => setTransactionStatus(null)}>
                    <DialogContent className="w-[682px] max-w-none overflow-y-auto max-h-[500px]">
                        <DialogHeader>
                            <DialogTitle className={`text-center text-${transactionStatus === 'sukses' ? 'green' : 'red'}-500 text-2xl font-bold`}>
                                {transactionStatus === 'sukses' ? 'SUKSES' : 'GAGAL'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="w-full flex flex-col gap-10">
                            {transactionStatus === 'sukses' ? (
                                <>
                                    <div className="self-stretch text-center text-black text-xl font-medium leading-tight">
                                        Selamat! Anda berhasil membeli voucher!
                                    </div>
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div className="w-[198px] flex-col justify-center items-center gap-2 inline-flex">
                                            <div className="self-stretch text-[#1ab35f] text-base font-medium ">Kode</div>
                                            <div className="self-stretch px-4 py-5 bg-[#e8f7ef] rounded-xl justify-start items-center gap-2.5 inline-flex">
                                                <div className="grow shrink basis-0 text-black text-xl font-medium">{selectedVoucher?.kode}</div>
                                            </div>
                                        </div>
                                        <div className="w-[198px] flex-col justify-center items-center gap-2 inline-flex">
                                            <div className="self-stretch text-[#1ab35f] text-base font-medium ">Jumlah Hari Berlaku</div>
                                            <div className="self-stretch px-4 py-5 bg-[#e8f7ef] rounded-xl justify-start items-center gap-2.5 inline-flex">
                                                <div className="grow shrink basis-0 text-black text-xl font-medium">{selectedVoucher?.jmlhariberlaku}</div>
                                            </div>
                                        </div>
                                        <div className="w-[198px] flex-col justify-center items-center gap-2 inline-flex">
                                            <div className="self-stretch text-[#1ab35f] text-base font-medium ">Kuota Penggunaan</div>
                                            <div className="self-stretch px-4 py-5 bg-[#e8f7ef] rounded-xl justify-start items-center gap-2.5 inline-flex">
                                                <div className="grow shrink basis-0 text-black text-xl font-medium">{selectedVoucher?.kuotapelangganan}</div>
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
            )}
        </div>
    );
};
