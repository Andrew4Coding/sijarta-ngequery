// app/api/pekerja/route.ts
import pool from "@/database/db";

export async function GET(req: Request) {
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
      JOIN "USER" u ON p.ID = u.ID;
    `;
    const pekerja = await pool.query(query);

    return new Response(
      JSON.stringify({
        message: "Success",
        data: pekerja.rows,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error fetching pekerja data:", error.message);
    return new Response(
      JSON.stringify({
        message: "Error fetching data",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
