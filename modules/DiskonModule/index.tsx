// In DiskonModule/index.tsx

import React, { useState } from 'react';
import ModalPembelian from '@/modules/DiskonModule/elements/ModalPembelian'; // Import the ModalPembelian component

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

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Voucher</h2>
        <div style={styles.voucherContainer}>
          {voucherData.map((voucher, index) => (
            <div key={index} style={styles.voucherBox}>
              <div style={styles.voucherRow}>
                <span>{voucher.code}</span>
                <span>{voucher.discount}</span>
                <span>{voucher.minTransaction}</span>
                <span>{voucher.validity}</span>
                <span>{voucher.quota}</span>
                <span>{voucher.price}</span>
                <button style={styles.buyButton} onClick={() => handleVoucherPurchase(voucher)}>Button Beli</button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  voucherContainer: {
    display: 'flex',
    flexDirection: 'column', 
    gap: '10px',
  },
  voucherBox: {
    border: '1px solid #d9d9d9',
    padding: '10px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voucherRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
  },
  buyButton: {
    padding: '5px 10px',
    border: '1px solid #d9d9d9',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
  },
  promoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  promoBox: {
    border: '1px solid #d9d9d9',
    padding: '10px',
    borderRadius: '12px',
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
    flex: 1,
    textAlign: 'left',
  },
  promoEndDate: {
    textAlign: 'right', 
    flex: 1,
  },
} as const;
