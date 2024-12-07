export interface Voucher {
    kode: string;
    potongan: string;
    mintrpemesanan: number;
    jmlhariberlaku: string;
    kuotapelangganan: string;
    harga: number;
  }
  
export interface Promo {
    kode: string;
    tglakhirberlaku: Date;
  }

export interface MetodeBayar {
    id: string;
    nama: string;
  }