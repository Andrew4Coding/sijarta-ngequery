import { KategoriJasa } from "@/database/models/kategoriJasa";

export async function GET(req: Request) {
    const data = await new KategoriJasa().findAll();

    return new Response(
        JSON.stringify({
            message: "Success",
            data: data
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}