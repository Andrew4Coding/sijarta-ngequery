import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/database/models/user";
import { UserType } from "@/database/types";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

interface LoginInterface {
    noHp: string;
    password: string;
}

export async function GET(req: Request) {
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

        const token = jwt.sign(
            { id: user.id, noHp: user.nohp, nama: user.nama },
            SECRET_KEY,
            { expiresIn: "365d" }
        );

        return new Response(
            JSON.stringify({
                message: "Success",
                token,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

    } catch (error : any) {
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