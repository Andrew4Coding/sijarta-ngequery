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
  kategori: PaymentType;
}

export interface ResponseInterface {
  saldo: string;
  trHistory: PaymentHistoryInterface[];
}

export interface BayarTransaksiInterface {
  id: string;
  amount: number;
  date: Date;
  kategori: string;
}
