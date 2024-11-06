import { BaseModel } from '../model';
import { PelangganType } from '../types';

export class Pelanggan extends BaseModel<PelangganType> {
    constructor() {
        super('pelanggan');
    }
}
