import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Voucher } from "../interface";
import { MetodeBayar } from "../interface";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statuses } from "@/modules/PemesananJasaModule/const";

export const VoucherSection = ({
    daftarMetodeBayar,
    voucherData,
    userDataState,
    fetchUserProfile,
    fetchVouchers,
    fetchMetodeBayar,
}: {
    daftarMetodeBayar: MetodeBayar[]
    voucherData: Voucher[];
    userDataState: any;
    fetchUserProfile: () => Promise<void>;
    fetchVouchers: () => Promise<void>;
    fetchMetodeBayar: () => Promise<void>;
}) => {
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null); // state untuk menyimpan voucher yang dipilih
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null); // status transaksi: 'sukses' atau 'gagal'
    const [isPurchaseDialogOpen, setPurchaseDialogOpen] = useState(false); // state untuk dialog beli voucher
    const [metodeBayarId, setMetodeBayarId] = useState<string>(); // Untuk menyimpan data metode bayar
    
    const beliVoucher = async () => {
        if (!selectedVoucher) return;
        if (!metodeBayarId) return;

        const selectedMetodeBayar = daftarMetodeBayar.find(m => m.id === metodeBayarId)
        
        const { potongan, mintrpemesanan, kode } = selectedVoucher;

        const purchaseResponse = await fetch("/api/diskon/beliVoucher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userDataState.id,
            voucherCode: kode,
            paymentMethodId: selectedMetodeBayar?.id, // ID transaksi unik
            paymentMethodName: selectedMetodeBayar?.nama
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
                <h3 className="text-[#1ab35f] text-2xl font-bold">
                  {voucher.kode}
                </h3>
              </div>
              <div className="p-5 bg-white rounded-b-[20px] border border-[#d9d9d9] flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="text-black text-base">Potongan</span>
                  <span className="text-[#1ab35f] text-base">
                    {voucher.potongan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">
                    Min Transaksi Pemesanan
                  </span>
                  <span className="text-[#1ab35f] text-base">
                    Rp {voucher.mintrpemesanan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">
                    Jumlah Hari Berlaku
                  </span>
                  <span className="text-[#1ab35f] text-base">
                    {voucher.jmlhariberlaku} Hari
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">Kuota Penggunaan</span>
                  <span className="text-[#1ab35f] text-base">
                    {voucher.kuotapelangganan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base">Harga</span>
                  <span className="text-[#1ab35f] text-base">
                    Rp {voucher.harga}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger
                    className="mt-4 w-full py-2 rounded-lg text-sm hover:bg-[#159e54] transition-all bg-[#1ab35f] text-white"
                    onClick={() => {
                      setSelectedVoucher(voucher);
                      setPurchaseDialogOpen(true);
                    }}
                  >
                    Beli Voucher
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        {/* Dialog Beli Voucher */}
        {isPurchaseDialogOpen && (
          <Dialog
            open={isPurchaseDialogOpen}
            onOpenChange={setPurchaseDialogOpen}
          >
            <DialogContent className="w-[682px] h-auto p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-10">
              <DialogHeader>
                <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">
                  BELI VOUCHER
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <label className="text-black text-xl font-medium">
                  Metode Pembayaran
                </label>
                <Select value={metodeBayarId} onValueChange={setMetodeBayarId}>
                  <SelectTrigger className="p-2 border rounded-md">
                    <SelectValue placeholder="Pilih Metode Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {daftarMetodeBayar.map((m, idx) => (
                        <SelectItem key={idx} value={m.id}>
                          {m.nama}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <button
                className="self-stretch px-2.5 py-5 bg-[#1ab35f] rounded-xl text-white text-2xl font-bold disabled:bg-gray-400"
                onClick={() => {
                  setPurchaseDialogOpen(false);
                  beliVoucher();
                }}
                disabled={!metodeBayarId}
              >
                Beli
              </button>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialog Status Transaksi */}
        {transactionStatus && (
          <Dialog
            open={Boolean(transactionStatus)}
            onOpenChange={() => setTransactionStatus(null)}
          >
            <DialogContent className="w-[682px] max-w-none overflow-y-auto max-h-[500px]">
              <DialogHeader>
                <DialogTitle
                  className={`text-center text-${
                    transactionStatus === "sukses" ? "green" : "red"
                  }-500 text-2xl font-bold`}
                >
                  {transactionStatus === "sukses" ? "SUKSES" : "GAGAL"}
                </DialogTitle>
              </DialogHeader>
              <div className="text-center text-black text-xl font-medium">
                {transactionStatus === "sukses"
                  ? "Selamat! Anda berhasil membeli voucher!"
                  : "Saldo tidak cukup. Silakan top-up saldo Anda."}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
};
