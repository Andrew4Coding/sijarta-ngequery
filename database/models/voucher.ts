import { BaseModel } from '../model';
import { VoucherType } from '../types';

export class Voucher extends BaseModel<VoucherType> {
    constructor() {
        super('voucher');
    }
}
