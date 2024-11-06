import { BaseModel } from '../model';
import { SesiLayananType } from '../types';

export class SesiLayanan extends BaseModel<SesiLayananType> {
    constructor() {
        super('sesi_layanan');
    }
}
