import pool from "@/database/db";

export async function GET(req: Request) {
  try {
    const { rows } = await pool.query("SELECT * FROM DISKON");
    return new Response(
      JSON.stringify({
        message: "Success",
        data: rows,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
       },
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
