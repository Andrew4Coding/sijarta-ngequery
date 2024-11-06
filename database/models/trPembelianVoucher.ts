import { BaseModel } from '../model';
import { TrPembelianVoucherType } from '../types';

export class TrPembelianVoucher extends BaseModel<TrPembelianVoucherType> {
    constructor() {
        super('tr_pembelian_voucher');
    }
}
