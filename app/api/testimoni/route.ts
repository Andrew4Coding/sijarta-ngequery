import { Testimoni } from "@/database/models/testimoni";
import { TestimoniType } from "@/database/types";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { idtrpemesanan, tgl, teks, rating }: TestimoniType = body;

        console.log(body);

        if (!idtrpemesanan || !tgl || !teks || rating === undefined) {
            return new Response(
                JSON.stringify({
                    message: "Failed",
                    error: `All fields are required, missing fields are ${!idtrpemesanan ? 'idtrpemesanan, ' : ''}${!tgl ? 'tgl, ' : ''}${!teks ? 'teks, ' : ''}${rating === undefined ? 'rating' : ''}`,
                    body: body
                }),
                { status: 400 }
            );
        }

        const testimoniModel = new Testimoni();
        const newTestimoni = await testimoniModel.create({
            idtrpemesanan,
            tgl,
            teks,
            rating,
        });

        return new Response(
            JSON.stringify({
                message: "Success",
                data: newTestimoni,
            }),
            { status: 201 }
        );

    } catch (error: any) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}
