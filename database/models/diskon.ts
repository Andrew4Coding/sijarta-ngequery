// Diskon.ts
import { BaseModel } from '../model';
import { DiskonType } from '../types';

export class Diskon extends BaseModel<DiskonType> {
    constructor() {
        super('diskon');
    }
}
