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
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>DISKON</h1>

      {/* Voucher Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Voucher</h2>
        <div style={styles.voucherContainer}>
          {voucherData.map((voucher, index) => (
            <div key={index} style={styles.voucherBox}>
              <h3 style={styles.voucherTitle}>{voucher.code}</h3>
              <div style={styles.voucherDetail}>
                <span style={styles.voucherLabel}>Potongan</span>
                <span style={styles.voucherValue}>{voucher.discount}</span>
              </div>
              <hr style={styles.divider} />
              <div style={styles.voucherDetail}>
                <span style={styles.voucherLabel}>Min Transaksi Pemesanan</span>
                <span style={styles.voucherValue}>{voucher.minTransaction}</span>
              </div>
              <hr style={styles.divider} />
              <div style={styles.voucherDetail}>
                <span style={styles.voucherLabel}>Jumlah Hari Berlaku</span>
                <span style={styles.voucherValue}>{voucher.validity}</span>
              </div>
              <hr style={styles.divider} />
              <div style={styles.voucherDetail}>
                <span style={styles.voucherLabel}>Kuota Penggunaan</span>
                <span style={styles.voucherValue}>{voucher.quota}</span>
              </div>
              <hr style={styles.divider} />
              <div style={styles.voucherDetail}>
                <span style={styles.voucherLabel}>Harga</span>
                <span style={styles.voucherValue}>{voucher.price}</span>
              </div>
              <button style={styles.buyButton} onClick={() => handleVoucherPurchase(voucher)}>Beli Voucher</button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Promo</h2>
        <div style={styles.promoContainer}>
          {promoData.map((promo, index) => (
            <div key={index} style={styles.promoBox}>
              <div style={styles.promoRow}>
                <span style={styles.promoCode}>{promo.code}</span>
                <span style={styles.promoEndDate}>{promo.endDate}</span>
              </div>
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

const styles = {
  pageContainer: {
    padding: '20px',
    marginLeft: '80px',
    marginRight: '80px',
  },
  title: {
    textAlign: 'center' as 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    marginTop: '40px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '50px',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  voucherContainer: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },
  voucherBox: {
    width: '30%',
    border: '1px solid #d9d9d9',
    padding: '20px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  voucherTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center' as 'center',
    marginBottom: '15px',
  },
  voucherDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  voucherLabel: {
    color: '#333',
    fontSize: '16px',
  },
  voucherValue: {
    color: '#007BFF',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #d9d9d9',
    margin: '10px 0',
  },
  buyButton: {
    marginTop: '15px',
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  promoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  promoBox: {
    border: '1px solid #d9d9d9',
    padding: '20px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  promoCode: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '18px',
  },
  promoEndDate: {
    color: '#777',
    fontSize: '14px',
  },
} as const;

export default DiskonModule;
