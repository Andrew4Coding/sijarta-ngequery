"use client";

import React from 'react';
import { Voucher } from '@/modules/DiskonModule/index';

interface ModalPembelianProps {
  isModalOpen: boolean;
  isSuccess: boolean;
  selectedVoucher: Voucher | null;
  closeModal: () => void;
}

const ModalPembelian: React.FC<ModalPembelianProps> = ({
  isModalOpen,
  isSuccess,
  selectedVoucher,
  closeModal
}) => {
  if (!isModalOpen || !selectedVoucher) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>{isSuccess ? 'SUKSES' : 'GAGAL'}</h2>
        <p style={styles.modalMessage}>
          {isSuccess ? (
            <>
              Selamat! Anda berhasil membeli voucher dengan kode <strong>{selectedVoucher.code}</strong>. Voucher ini akan berlaku hingga tanggal <strong>{selectedVoucher.validity}</strong> dengan kuota penggunaan sebanyak <strong>{selectedVoucher.quota}</strong>.
            </>
          ) : (
            <>
              Maaf, saldo Anda tidak cukup untuk membeli voucher ini. Silakan top-up saldo Anda.
            </>
          )}
        </p>
        <button style={styles.closeButton} onClick={closeModal}>Tutup</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed' as 'fixed',  // Ensuring 'fixed' matches expected type
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center' as 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  modalMessage: {
    marginBottom: '20px',
  },
  closeButton: {
    padding: '5px 10px',
    border: '1px solid #d9d9d9',
    borderRadius: '12px',
    cursor: 'pointer' as 'pointer',
  },
} as const;


export default ModalPembelian;
