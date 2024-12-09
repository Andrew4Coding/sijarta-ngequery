export async function POST(req: Request) { 
    try {
        const query = new URL(req.url).searchParams;
        const pekerjaId = query.get("pekerjaId");
        const kategoriJasaId = query.get("kategoriJasaId");
    }

    catch (error) {
        return new Response(
            JSON.stringify({ message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
