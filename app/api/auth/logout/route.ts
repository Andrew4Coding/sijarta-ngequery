import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();

    cookieStore.delete("sessionToken");
    
    return new Response(
        JSON.stringify({
            message: "Success",
            data: "User logout successfully",
        }),
        { status: 200 }
    )
}