import { BaseModel } from '../model';
import { UserType } from '../types';

export class User extends BaseModel<UserType> {
    constructor() {
        super('"USER"');
    }

    async findByNoHP(noHp: string) {
        return this.findBy('nohp', noHp);
    }
}