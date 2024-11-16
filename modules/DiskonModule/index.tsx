"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

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

  const promoData = [
    { code: "PROMO10", endDate: "31/12/2024" },
    { code: "PROMO20", endDate: "15/11/2024" },
    { code: "PROMO50", endDate: "30/11/2024" },
  ];

  return (
    <div className="px-10 md:px-20 font-dmsans py-32">
      <h1 className="text-center font-bold text-2xl my-10">DISKON</h1>

      {/* Voucher Section */}
      <section className="mb-12">
        <h2 className="font-bold mb-2 text-2xl">Voucher</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap gap-5 justify-between">
          {voucherData.map((voucher, index) => (
            <div key={index} className="w-full border border-gray-300 p-5 rounded-2xl bg-white shadow-md">
              <h3 className="font-bold text-xl text-center mb-4">{voucher.code}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-sm">Potongan</span>
                <span className="text-blue-600 font-bold text-xs md:text-sm">{voucher.discount}</span>
              </div>
              <Separator className='my-2 border-[0.5px] border-black/5' />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-xs md:text-sm">Min Transaksi Pemesanan</span>
                <span className="text-blue-600 font-bold text-xs md:text-sm">Rp {voucher.minTransaction}</span>
              </div>
              <Separator className='my-2 border-[0.5px] border-black/5' />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-xs md:text-sm">Jumlah Hari Berlaku</span>
                <span className="text-blue-600 font-bold text-xs md:text-sm">{voucher.validity}</span>
              </div>
              <Separator className='my-2 border-[0.5px] border-black/5' />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-xs md:text-sm">Kuota Penggunaan</span>
                <span className="text-blue-600 font-bold text-xs md:text-sm">{voucher.quota}</span>
              </div>
              <Separator className='my-2 border-[0.5px] border-black/5' />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-xs md:text-sm">Harga</span>
                <span className="text-blue-600 font-bold text-xs md:text-sm">Rp {voucher.price}</span>
              </div>
              <Dialog>
                <DialogTrigger className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 duration-300">
                  Beli Voucher
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">{voucher.price >= 10000 ? 'Sukses' : 'Gagal' }</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <p className="mb-4">
                      {(
                        voucher.price >= 10000
                      ) ? (
                        <>
                          Selamat! Anda berhasil membeli voucher dengan kode <strong>{voucher.code}</strong>. Voucher ini akan berlaku hingga tanggal <strong>{voucher.validity}</strong> dengan kuota penggunaan sebanyak <strong>{voucher.quota}</strong>.
                        </>
                      ) : (
                        <>
                          Maaf, saldo Anda tidak cukup untuk membeli voucher ini. Silakan top-up saldo Anda.
                        </>
                      )}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="mb-12">
        <h2 className="font-bold mb-2 text-2xl">Promo</h2>
        <div className="flex flex-col gap-5">
          {promoData.map((promo, index) => (
            <div key={index} className="border border-gray-300 p-5 rounded-2xl bg-white shadow-md flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">{promo.code}</span>
              <span className="text-gray-500 text-sm">{promo.endDate}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiskonModule;