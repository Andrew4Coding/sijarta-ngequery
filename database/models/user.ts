import { BaseModel } from '../model';
import { UserType } from '../types';

export class User extends BaseModel<UserType> {
    constructor() {
        super('USERTABLE');
    }

    async findByNoHP(noHp: string) {
        return this.findBy('nohp', noHp);
    }

    async getRole(uuid: string) {
        const result = await this.customQuery(
            "SELECT EXISTS (SELECT 1 FROM PEKERJA WHERE ID = $1);",
            [uuid]
        );
        const isPekerja: boolean = result[0]['exists'];

        return isPekerja ? 'pekerja' : 'pelanggan';
    }
}