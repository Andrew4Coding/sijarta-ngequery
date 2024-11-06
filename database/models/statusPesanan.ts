import { BaseModel } from '../model';
import { StatusPesananType } from '../types';

export class StatusPesanan extends BaseModel<StatusPesananType> {
    constructor() {
        super('status_pesanan');
    }
}
