import { customSQL } from '@/database/model';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); // Filter kategori
    const search = searchParams.get('search'); // Search subkategori

    let query = `
        SELECT subkategori.namasubkategori, subkategori.deskripsi, kategori.namakategori
        FROM subkategori_jasa subkategori
        INNER JOIN kategori_jasa kategori ON subkategori.kategorijasaid = kategori.id
    `;
    const conditions: string[] = [];
    const params: any[] = [];

    if (category) {
        conditions.push(`kategori.namakategori = $${conditions.length + 1}`);
        params.push(category);
    }

    if (search) {
        conditions.push(`subkategori.namasubkategori ILIKE $${conditions.length + 1}`);
        params.push(`%${search}%`);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    try {
        const data = await customSQL(query);
        return new Response(
            JSON.stringify({ message: 'Success', data }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error fetching data', error }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
