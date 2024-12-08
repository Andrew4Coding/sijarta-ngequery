import { Pekerja } from "@/database/models/pekerja";
import { User } from "@/database/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

interface LoginInterface {
    noHp: string;
    password: string;
}

export async function POST(req: Request) {
    const cookieStore = await cookies();
    
    const { noHp, password }: LoginInterface = await req.json();

    if (!noHp || !password) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "All fields are required",
            }),
            { status: 400 }
        )
    }

    try {
        const userModel = new User();
        const user = await userModel.findByNoHP(noHp);

        if (!user) {
            return new Response(
                JSON.stringify({
                    message: "Failed",
                    error: "User not found",
                }),
                { status: 404 }
            )
        }

        const role = await userModel.getRole(user.id);
        
        const isPasswordValid = await bcrypt.compare(password, user.pwd || "");

        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({
                    message: "Failed",
                    error: "Invalid password",
                }),
                { status: 400 }
            )
        }

        const pekerjaModel = new Pekerja();
        let pekerja;;
        if (role == "pekerja") {
            pekerja = await pekerjaModel.findBy('id', user.id);
        }


        const token = jwt.sign(
            { 
                data: {
                    id: user.id,
                    nama: user.nama,
                    linkfoto: pekerja?.linkfoto,  
                    saldoMpay: user.saldompay,
                },
                role: role
             },
            SECRET_KEY,
            { expiresIn: "365d" }
        );

        // Set cookies
        cookieStore.set("sessionToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return new Response(
            JSON.stringify({
                message: "Success",
                role: role,
                token,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            },
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