import { BaseModel } from '../model';
import { TestimoniType } from '../types';

export class Testimoni extends BaseModel<TestimoniType> {
    constructor() {
        super('testimoni');
    }
}
