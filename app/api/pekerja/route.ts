import pool from "@/database/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const subkategoriId = url.searchParams.get("subkategoriId");

  if (!subkategoriId) {
    return new Response(
      JSON.stringify({ message: "Subkategori ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const query = `
      SELECT 
        p.ID AS id,
        u.NAMA AS nama,
        u.NOHP AS nohp,
        u.TGLLAHIR AS tgllahir,
        u.ALAMAT AS alamat,
        p.RATING AS rating,
        p.JUMLAHPESANANASELESAI AS jumlahpesananaselesai,
        p.LINKFOTO AS linkfoto
      FROM PEKERJA p
      JOIN "USER" u ON p.ID = u.ID
      JOIN PEKERJA_KATEGORI_JASA pkj ON pkj.PekerjaId = p.ID
      WHERE pkj.KategoriJasaId = (
        SELECT KategoriJasaId FROM SUBKATEGORI_JASA WHERE id = $1
      );
    `;

    const { rows } = await pool.query(query, [subkategoriId]);

    if (!rows.length) {
      return new Response(
        JSON.stringify({ message: "No workers found", data: [] }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Success", data: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching pekerja data:", error.message);
      return new Response(
        JSON.stringify({ message: "Internal Server Error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.error("Unknown error fetching pekerja data:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: "Unknown error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
