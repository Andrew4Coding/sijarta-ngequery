import { User } from "@/database/models/user";
import { UserType } from "@/database/types";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const {
            id,
            alamat,
            jeniskelamin,
            nama,
            nohp,
            pwd,
            saldompay,
            tgllahir
        }: UserType = await req.json();

        if (
            !id ||
            !alamat ||
            !jeniskelamin ||
            !nama ||
            !nohp ||
            !pwd ||
            !saldompay ||
            !tgllahir
        ) {
            return new Response(
                JSON.stringify({
                    message: "Failed",
                    error: "All fields are required",
                }),
                { status: 400 }
            )
        }
        
        const userModel = new User();
        const existingUser = await userModel.findByNoHP(nohp);

        if (existingUser) {
            return new Response(
                JSON.stringify({
                    message: "Failed",
                    error: "User already exists",
                }),
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = await userModel.create({
            id,
            alamat,
            jeniskelamin,
            nama,
            nohp,
            pwd: hashedPassword,
            saldompay,
            tgllahir
        })

        return new Response(
            JSON.stringify({
                message: "Success",
                data: newUser,
            }),
            { status: 201 }
        )

    } catch (error: any) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: error.message,
            }),
            { status: 500 }
        )
    }
}
