import {
  PaymentType,
  BayarTransaksiInterface,
} from "./interface";

export const dummyBayarTransaksiData: BayarTransaksiInterface[] = [
  {
    id: "1",
    amount: 73659,
    date: new Date(2024, 10, 6, 14, 23, 45),
    kategori: "Cleaning Service",
  },
  {
    id: "2",
    amount: 67757,
    date: new Date(2024, 10, 6, 14, 23, 45),
    kategori: "Cleaning Service",
  },
  {
    id: "3",
    amount: 39186,
    date: new Date(2024, 10, 6, 14, 23, 45),
    kategori: "Antar Makanan",
  },
  {
    id: "4",
    amount: 86642000,
    date: new Date(2024, 10, 6, 14, 23, 45),
    kategori: "Antar Makanan",
  },
  {
    id: "5",
    amount: 88046,
    date: new Date(2024, 10, 6, 14, 23, 45),
    kategori: "Antar Makanan",
  },
  {
    id: "6",
    amount: 12034,
    date: new Date(2024, 10, 6, 14, 23, 45),
    kategori: "Car Service",
  },
  {
    id: "7",
    amount: 41863,
    date: new Date(2025, 1, 2, 9, 12, 30),
    kategori: "Car Service",
  },
  {
    id: "8",
    amount: 73160,
    date: new Date(2025, 1, 2, 9, 12, 30),
    kategori: "Car Service",
  },
  {
    id: "9",
    amount: 97712,
    date: new Date(2025, 1, 2, 9, 12, 30),
    kategori: "Car Service",
  },
  {
    id: "10",
    amount: 84407,
    date: new Date(2025, 1, 2, 9, 12, 30),
    kategori: "Home Service",
  },
];

export const paymentTypeData: PaymentType[] = [
  "Withdrawal",
  "TopUp MyPay",
  "Transfer MyPay",
  "Membayar Transaksi",
];
