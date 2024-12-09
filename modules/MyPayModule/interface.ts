export type PaymentType =
  | "Withdrawal"
  | "TopUp MyPay"
  | "Transfer MyPay"
  | "Membayar Transaksi";

export interface PaymentHistoryInterface {
  id: string;
  nominal: number;
  tanggal: Date;
  kategoriid: string;
  kategori: PaymentType | "Terima Transfer" | "Pembayaran Voucher" | "Menerima Honor Transaksi Jasa" | "Pengembalian Dana";
}

export interface ResponseInterface {
  noHp: string;
  saldo: string;
  trHistory: PaymentHistoryInterface[];
}

export interface BayarTransaksiInterface {
  id: string;
  amount: number;
  date: Date;
  kategori: string;
}

export interface UnPaidPesananInterface {
  id: string;
  nominal: string;
  tanggalpemesanan: Date;
  subkategori: string;
  status: string;
}
