import { Pekerja } from "@/database/models/pekerja";
import { queries } from "@/lib/queries";

export async function GET(req: Request) {
  const { page, limit } = queries(req);
  
  try {
    const pekerja = new Pekerja();
    const rows = await pekerja.findAllWithPagination(
      limit,
      page
    );
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
