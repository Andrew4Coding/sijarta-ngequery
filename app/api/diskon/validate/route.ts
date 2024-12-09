import pool from "@/database/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const discountCode = url.searchParams.get("code");

    // Validasi jika kode diskon tidak diberikan
    if (!discountCode) {
      return new Response(
        JSON.stringify({ message: "Kode diskon tidak diberikan" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Query untuk validasi kode diskon dan tanggal akhir berlaku
    const query = `
      SELECT 
        d.Kode, 
        CAST(d.Potongan AS FLOAT) AS Potongan, 
        CAST(d.MinTrPemesanan AS FLOAT) AS MinTrPemesanan, 
        p.TglAkhirBerlaku
      FROM DISKON d
      JOIN PROMO p ON d.Kode = p.Kode
      WHERE d.Kode = $1;
    `;

    // Jalankan query dengan parameter kode diskon
    const result = await pool.query(query, [discountCode]);

    // Jika hasil query kosong, kode diskon tidak ditemukan
    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Kode diskon tidak ditemukan" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const { potongan, mintrpemesanan, tglakhirberlaku } = result.rows[0];

    // Validasi jika tanggal akhir berlaku sudah kedaluwarsa
    const today = new Date();
    const expiryDate = new Date(tglakhirberlaku);
    if (expiryDate < today) {
      return new Response(
        JSON.stringify({ message: "Kode diskon tidak valid atau sudah kedaluwarsa" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Kembalikan respons sukses jika kode diskon valid
    return new Response(
      JSON.stringify({
        message: "Kode diskon valid",
        data: {
          Potongan: potongan,
          MinTrPemesanan: mintrpemesanan,
          TglAkhirBerlaku: tglakhirberlaku, // Opsional, untuk debugging atau kebutuhan tambahan
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Tangkap error dan log untuk debugging
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}