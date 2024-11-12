export type PaymentType = "Withdrawal" | "TopUp MyPay" | "Transfer MyPay" | "Membayar Transaksi";

export interface paymentHistoryInterface {
  id: string;
  amount: number;
  date: Date;
  type: PaymentType;
}
