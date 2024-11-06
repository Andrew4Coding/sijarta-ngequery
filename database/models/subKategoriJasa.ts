import { BaseModel } from '../model';
import { SubkategoriJasaType } from '../types';

export class SubkategoriJasa extends BaseModel<SubkategoriJasaType> {
    constructor() {
        super('subkategori_jasa');
    }
}
