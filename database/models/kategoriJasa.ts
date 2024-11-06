import { BaseModel } from '../model';
import { KategoriJasaType } from '../types';

export class KategoriJasa extends BaseModel<KategoriJasaType> {
    constructor() {
        super('kategori_jasa');
    }
}
