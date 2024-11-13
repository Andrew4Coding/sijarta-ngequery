import {
  paymentHistoryInterface,
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

export const dummyData: paymentHistoryInterface[] = [
  {
    id: "1",
    amount: 73659,
    date: new Date(2024, 10, 6, 14, 23, 45),
    type: "Membayar Transaksi",
  },
  {
    id: "2",
    amount: 67757,
    date: new Date(2024, 10, 6, 14, 23, 45),
    type: "Membayar Transaksi",
  },
  {
    id: "3",
    amount: 39186,
    date: new Date(2024, 10, 6, 14, 23, 45),
    type: "Withdrawal",
  },
  {
    id: "4",
    amount: 86642000,
    date: new Date(2024, 10, 6, 14, 23, 45),
    type: "TopUp MyPay",
  },
  {
    id: "5",
    amount: 88046,
    date: new Date(2024, 10, 6, 14, 23, 45),
    type: "TopUp MyPay",
  },
  {
    id: "6",
    amount: 12034,
    date: new Date(2024, 10, 6, 14, 23, 45),
    type: "Withdrawal",
  },
  {
    id: "7",
    amount: 41863,
    date: new Date(2025, 1, 2, 9, 12, 30),
    type: "Withdrawal",
  },
  {
    id: "8",
    amount: 73160,
    date: new Date(2025, 1, 2, 9, 12, 30),
    type: "Withdrawal",
  },
  {
    id: "9",
    amount: 97712,
    date: new Date(2025, 1, 2, 9, 12, 30),
    type: "Membayar Transaksi",
  },
  {
    id: "10",
    amount: 84407,
    date: new Date(2025, 1, 2, 9, 12, 30),
    type: "Withdrawal",
  },
  {
    id: "11",
    amount: 95492,
    date: new Date(2025, 1, 2, 9, 12, 30),
    type: "Withdrawal",
  },
  {
    id: "12",
    amount: 72451,
    date: new Date(2025, 1, 2, 9, 12, 30),
    type: "Transfer MyPay",
  },
  {
    id: "13",
    amount: 75621,
    date: new Date(2025, 1, 4, 18, 45, 12),
    type: "TopUp MyPay",
  },
  {
    id: "14",
    amount: 47298,
    date: new Date(2025, 1, 4, 18, 45, 12),
    type: "Withdrawal",
  },
  {
    id: "15",
    amount: 45923,
    date: new Date(2025, 1, 4, 18, 45, 12),
    type: "Withdrawal",
  },
  {
    id: "16",
    amount: 89213,
    date: new Date(2025, 1, 4, 18, 45, 12),
    type: "TopUp MyPay",
  },
  {
    id: "17",
    amount: 1556,
    date: new Date(2025, 1, 4, 18, 45, 12),
    type: "Withdrawal",
  },
  {
    id: "18",
    amount: 8638,
    date: new Date(2025, 1, 4, 18, 45, 12),
    type: "Membayar Transaksi",
  },
  {
    id: "19",
    amount: 80449,
    date: new Date(2025, 2, 4, 11, 33, 27),
    type: "Transfer MyPay",
  },
  {
    id: "20",
    amount: 7997,
    date: new Date(2025, 2, 4, 11, 33, 27),
    type: "Transfer MyPay",
  },
  {
    id: "21",
    amount: 99395,
    date: new Date(2025, 2, 4, 11, 33, 27),
    type: "Transfer MyPay",
  },
  {
    id: "22",
    amount: 96758,
    date: new Date(2025, 2, 4, 11, 33, 27),
    type: "TopUp MyPay",
  },
  {
    id: "23",
    amount: 85502,
    date: new Date(2025, 2, 4, 11, 33, 27),
    type: "TopUp MyPay",
  },
  {
    id: "24",
    amount: 14129,
    date: new Date(2025, 2, 4, 11, 33, 27),
    type: "Withdrawal",
  },
  {
    id: "25",
    amount: 89747,
    date: new Date(2025, 2, 5, 16, 55, 40),
    type: "Transfer MyPay",
  },
  {
    id: "26",
    amount: 303310,
    date: new Date(2025, 2, 5, 16, 55, 40),
    type: "Membayar Transaksi",
  },
  {
    id: "27",
    amount: 18685,
    date: new Date(2025, 2, 5, 16, 55, 40),
    type: "Membayar Transaksi",
  },
  {
    id: "28",
    amount: 98501,
    date: new Date(2025, 2, 5, 16, 55, 40),
    type: "Withdrawal",
  },
  {
    id: "29",
    amount: 83388,
    date: new Date(2025, 2, 5, 16, 55, 40),
    type: "Transfer MyPay",
  },
  {
    id: "30",
    amount: 67994,
    date: new Date(2025, 2, 5, 16, 55, 40),
    type: "Membayar Transaksi",
  },
];

export const paymentTypeData: PaymentType[] = [
  "Withdrawal",
  "TopUp MyPay",
  "Transfer MyPay",
  "Membayar Transaksi",
];
