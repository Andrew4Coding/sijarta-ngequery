import { BaseModel } from '../model';
import { TrMpayType } from '../types';

export class TrMpay extends BaseModel<TrMpayType> {
    constructor() {
        super('tr_mpay');
    }
}
