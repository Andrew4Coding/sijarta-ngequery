import { BaseModel } from '../model';
import { PekerjaKategoriJasaType } from '../types';

export class PekerjaKategoriJasa extends BaseModel<PekerjaKategoriJasaType> {
    constructor() {
        super('pekerja_kategori_jasa');
    }
}
