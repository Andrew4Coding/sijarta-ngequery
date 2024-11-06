import { BaseModel } from '../model';
import { TrPemesananStatusType } from '../types';

export class TrPemesananStatus extends BaseModel<TrPemesananStatusType> {
    constructor() {
        super('tr_pemesanan_status');
    }
}
