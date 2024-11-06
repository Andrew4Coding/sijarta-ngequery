import { BaseModel } from '../model';
import { KategoriTrMpayType } from '../types';

export class KategoriTransaksiMpay extends BaseModel<KategoriTrMpayType> {
    constructor() {
        super('kategori_tr_mpay');
    }
}
