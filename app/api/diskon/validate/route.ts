import { NextResponse } from "next/server";
import db from "@/database/db"; // Path diupdate sesuai struktur proyek

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(
      JSON.stringify({ message: "Kode diskon tidak ditemukan" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Query ke database
    console.log("Validating discount code:", code);
    const { rows } = await db.query(
      `
      SELECT Kode, Potongan, MinTrPemesanan
      FROM DISKON
      WHERE Kode = $1
      `,
      [code]
    );

    if (rows.length === 0) {
      console.log("Discount code not found in database:", code);
      return new Response(
        JSON.stringify({ message: "Kode diskon tidak valid" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const diskon = rows[0];
    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          kode: diskon.kode,
          potongan: diskon.potongan,
          minTrPemesanan: diskon.mintrpemesanan,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan pada server" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
