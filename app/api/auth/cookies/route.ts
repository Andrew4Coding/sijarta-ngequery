import { cookies } from "next/headers";

export async function GET(req: Request) {
    const cookieStore = await cookies();

    return new Response(
        JSON.stringify({
            message: "Success",
            token: cookieStore.get('sessionToken')?.value,
        }),
        { status: 200 }
    )
}