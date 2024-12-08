// app/api/pekerja/route.ts
import pool from "@/database/db";

export async function GET(req: Request) {
  try {
    // Query untuk mendapatkan data pekerja
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

    // Eksekusi query
    const { rows } = await pool.query(query);

    // Jika data kosong, kirim respons yang sesuai
    if (!rows.length) {
      return new Response(
        JSON.stringify({
          message: "No data available",
          data: [],
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Respons sukses
    return new Response(
      JSON.stringify({
        message: "Success",
        data: rows,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error fetching pekerja data:", error.message);

    // Respons error
    return new Response(
      JSON.stringify({
        message: "Error fetching data",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
