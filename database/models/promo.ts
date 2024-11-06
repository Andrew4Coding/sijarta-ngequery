import { BaseModel } from '../model';
import { PromoType } from '../types';

export class Promo extends BaseModel<PromoType> {
    constructor() {
        super('promo');
    }
}
