import pool from "@/database/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tglPemesanan, totalBiaya, idPelanggan, idDiskon, idMetodeBayar, sesi, idSubKategori } = body;

    // Validasi diskon
    if (idDiskon) {
      const queryDiskon = "SELECT * FROM DISKON WHERE Kode = $1";
      const resultDiskon = await pool.query(queryDiskon, [idDiskon]);

      if (resultDiskon.rows.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "Kode diskon tidak valid." }),
          { status: 400 }
        );
      }
    }

    // Buat pesanan jasa
    const idPemesanan = uuidv4();
    const queryInsert = `
      INSERT INTO TR_PEMESANAN_JASA (id, TglPemesanan, TglPekerjaan, WaktuPekerjaan, TotalBiaya, idPelanggan, idKategoriJasa, Sesi, idDiskon, idMetodeBayar)
      VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;

    const result = await pool.query(queryInsert, [
      idPemesanan,
      tglPemesanan,
      tglPemesanan, // contoh, pekerjaan langsung dilakukan pada tanggal pemesanan
      totalBiaya,
      idPelanggan,
      idSubKategori,
      sesi,
      idDiskon,
      idMetodeBayar,
    ]);

    return new Response(
      JSON.stringify({ success: true, message: "Pesanan berhasil dibuat.", id: result.rows[0].id }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error." }),
      { status: 500 }
    );
  }
}
