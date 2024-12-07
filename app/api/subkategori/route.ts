// app/api/subkategori/route.ts
import { customSQL } from "@/database/model";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const subCategoryName = url.searchParams.get("name");

    // Tambahkan log di sini
    console.log("subCategoryName:", subCategoryName);

    if (!subCategoryName) {
        return new Response(
            JSON.stringify({ message: "Subcategory name is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        // Query untuk mendapatkan data subkategori berdasarkan nama
        const subcategoryQuery = `
            SELECT 
                sj.namasubkategori, 
                sj.deskripsi,
                kj.namakategori
            FROM subkategori_jasa sj
            JOIN kategori_jasa kj ON sj.kategorijasaid = kj.id
            WHERE LOWER(sj.namasubkategori) = LOWER($1);
        `;

        const sessionsQuery = `
            SELECT sesi, harga 
            FROM sesi_layanan 
            WHERE subkategoriid IN (
                SELECT id FROM subkategori_jasa WHERE namasubkategori = $1
            );
        `;

        const subcategoryData = await customSQL(subcategoryQuery, [subCategoryName]);
        const sessionsData = await customSQL(sessionsQuery, [subCategoryName]);

        if (subcategoryData.length === 0) {
            return new Response(
                JSON.stringify({ message: "Subcategory not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Success",
                data: {
                    subcategory: subcategoryData[0],
                    sessions: sessionsData,
                },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
