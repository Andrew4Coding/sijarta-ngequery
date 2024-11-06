import { BaseModel } from '../model';
import { TrPemesananJasaType } from '../types';

export class TrPemesananJasa extends BaseModel<TrPemesananJasaType> {
    constructor() {
        super('tr_pemesanan_jasa');
    }
}
