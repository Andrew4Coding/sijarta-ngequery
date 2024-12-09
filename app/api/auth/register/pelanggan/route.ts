import { Pelanggan } from "@/database/models/pelanggan";
import { User } from "@/database/models/user";
import { UserType } from "@/database/types";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            id,
            alamat,
            jeniskelamin,
            nama,
            nohp,
            pwd,
            saldompay,
            tgllahir
        }: UserType = body;

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
                    error: `All fields are required, missing fields are ${!id ? 'id, ' : ''}${!alamat ? 'alamat, ' : ''}${!jeniskelamin ? 'jeniskelamin, ' : ''}${!nama ? 'nama, ' : ''}${!nohp ? 'nohp, ' : ''}${!pwd ? 'pwd, ' : ''}${!saldompay ? 'saldompay, ' : ''}${!tgllahir ? 'tgllahir, ' : ''}`,
                    body: body
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

        const pelangganModel = new Pelanggan();
        await pelangganModel.create({
            id: newUser.id,
            level: "-"
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
