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

    async addKategoriJasa(pekerjaid: string, kategorijasaid: string) {
        await this.customQuery("INSERT INTO PEKERJA_KATEGORI_JASA (pekerjaid, kategorijasaid) VALUES ($1, $2);", [pekerjaid, kategorijasaid]);
    }

    async clearKategoriJasa(pekerjaId: string) {
        await this.customQuery("DELETE FROM PEKERJA_KATEGORI_JASA WHERE pekerjaid = $1;", [pekerjaId]);
    }
}
