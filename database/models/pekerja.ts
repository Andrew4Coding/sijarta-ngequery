import { BaseModel } from '../model';
import { PekerjaType } from '../types';

export class Pekerja extends BaseModel<PekerjaType> {
    constructor() {
        super('pekerja');
    }
}
