import { BaseModel } from '../model';
import { MetodeBayarType } from '../types';

export class MetodeBayar extends BaseModel<MetodeBayarType> {
    constructor() {
        super('metode_bayar');
    }
}
