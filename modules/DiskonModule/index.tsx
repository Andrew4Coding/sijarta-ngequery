"use client";

import React, { useState } from 'react';
import ModalPembelian from '@/modules/DiskonModule/elements/ModalPembelian';

export interface Voucher {
  code: string;
  discount: string;
  minTransaction: string;
  validity: string;
  quota: string;
  price: string;
}

export const DiskonModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleVoucherPurchase = (voucher: Voucher) => {
    const userBalance = 100000;
    const voucherPrice = parseInt(voucher.price.replace("Rp ", "").replace(".", ""));

    if (userBalance >= voucherPrice) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const voucherData: Voucher[] = [
    { code: "DISKON50", discount: "50%", minTransaction: "Rp 100.000", validity: "30 Hari", quota: "10x", price: "Rp 50.000" },
    { code: "DISKON30", discount: "30%", minTransaction: "Rp 75.000", validity: "15 Hari", quota: "5x", price: "Rp 30.000" },
    { code: "DISKON20", discount: "20%", minTransaction: "Rp 50.000", validity: "7 Hari", quota: "2x", price: "Rp 20.000" },
  ];

  const promoData = [
    { code: "PROMO10", endDate: "31/12/2024" },
    { code: "PROMO20", endDate: "15/11/2024" },
    { code: "PROMO50", endDate: "30/11/2024" },
  ];

  return (
    <div className="px-20">
      <h1 className="text-center font-bold text-2xl mt-10 mb-5">DISKON</h1>

      {/* Voucher Section */}
      <section className="mb-12">
        <h2 className="font-bold mb-2">Voucher</h2>
        <div className="grid grid-cols-3 gap-5">
          {voucherData.map((voucher, index) => (
            <div key={index} className="border border-gray-300 p-5 rounded-xl bg-white shadow-md">
              <h3 className="font-bold text-xl text-center mb-3">{voucher.code}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-base">Potongan</span>
                <span className="text-blue-600 text-base font-bold">{voucher.discount}</span>
              </div>
              <hr className="border-t border-gray-300 my-2" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-base">Min Transaksi Pemesanan</span>
                <span className="text-blue-600 text-base font-bold">{voucher.minTransaction}</span>
              </div>
              <hr className="border-t border-gray-300 my-2" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-base">Jumlah Hari Berlaku</span>
                <span className="text-blue-600 text-base font-bold">{voucher.validity}</span>
              </div>
              <hr className="border-t border-gray-300 my-2" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-base">Kuota Penggunaan</span>
                <span className="text-blue-600 text-base font-bold">{voucher.quota}</span>
              </div>
              <hr className="border-t border-gray-300 my-2" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 text-base">Harga</span>
                <span className="text-blue-600 text-base font-bold">{voucher.price}</span>
              </div>
              <button 
                className="w-full mt-4 p-3 rounded-md bg-blue-600 text-white font-bold cursor-pointer"
                onClick={() => handleVoucherPurchase(voucher)}>
                Beli Voucher
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="mb-12">
        <h2 className="font-bold mb-2">Promo</h2>
        <div className="flex flex-col gap-5">
          {promoData.map((promo, index) => (
            <div key={index} className="border border-gray-300 p-5 rounded-xl bg-white shadow-md flex justify-between items-center">
              <span className="font-bold text-gray-800 text-lg">{promo.code}</span>
              <span className="text-gray-500 text-sm">{promo.endDate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Use ModalPembelian component */}
      <ModalPembelian
        isModalOpen={isModalOpen}
        isSuccess={isSuccess}
        selectedVoucher={selectedVoucher}
        closeModal={closeModal}
      />
    </div>
  );
};

export default DiskonModule;
