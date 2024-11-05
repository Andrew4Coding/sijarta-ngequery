import pool from "@/database/db";

export async function GET(req: Request) {
  try {
    const { rows } = await pool.query("SELECT * FROM sijarta");
    return new Response(
      JSON.stringify({
        message: "Success",
        sijarta: rows,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
