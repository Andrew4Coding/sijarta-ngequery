import { BaseModel} from '../model';
import { PekerjaType } from '../types';

export class Pekerja extends BaseModel<PekerjaType> {
    constructor() {
        super('pekerja');
    }

    async getKategoriJasa(uuid: string) {
        const result: {
            namakategori: string;
        }[] = await this.customQuery("SELECT namakategori FROM PEKERJA_KATEGORI_JASA PKJ, KATEGORI_JASA KJ WHERE PKJ.kategorijasaid = KJ.id AND pekerjaid = $1;", [uuid]);

        return result.map((item) => item.namakategori);
    }
}
