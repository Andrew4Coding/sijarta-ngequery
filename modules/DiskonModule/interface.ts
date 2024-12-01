export interface Voucher {
    kode: string;
    potongan: string;
    mintrpemesanan: number;
    jmlhariberlaku: string;
    kuotapelangganan: string;
    harga: number;
    idmetodebayar: string;
  }
  
export interface Promo {
    kode: string;
    tglakhirberlaku: Date;
  }