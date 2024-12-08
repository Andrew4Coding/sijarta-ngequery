import { customSQL } from "@/database/model";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const subCategoryName = url.searchParams.get("name");

    if (!subCategoryName) {
        return new Response(
            JSON.stringify({ message: "Subcategory name is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        const subcategoryQuery = `
            SELECT 
                sj.id AS subkategoriid,
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
            WHERE subkategoriid = (
                SELECT id 
                FROM subkategori_jasa 
                WHERE LOWER(namasubkategori) = LOWER($1)
            );
        `;

        const subcategoryData = await customSQL(subcategoryQuery, [subCategoryName]);

        if (!subcategoryData.length || !subcategoryData[0].subkategoriid) {
            return new Response(
                JSON.stringify({ message: "Subcategory not found or invalid ID" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const sessionsData = await customSQL(sessionsQuery, [subCategoryName]);

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
        if (error instanceof Error) {
            console.error("Error:", error.message);
            return new Response(
                JSON.stringify({ message: "Internal Server Error", error: error.message }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        } else {
            console.error("Unknown Error:", error);
            return new Response(
                JSON.stringify({ message: "Internal Server Error", error: "Unknown error occurred" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    }
}
