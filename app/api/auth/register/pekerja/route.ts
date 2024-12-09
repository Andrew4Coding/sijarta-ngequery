import { Pekerja } from "@/database/models/pekerja";
import { User } from "@/database/models/user";
import { PekerjaType, UserType } from "@/database/types";
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
            tgllahir,
            namabank,
            nomorrekening,
            npwp,
            linkfoto,            
        }: UserType & PekerjaType = await req.json();

        if (
            !id ||
            !alamat ||
            !jeniskelamin ||
            !nama ||
            !nohp ||
            !pwd ||
            !saldompay ||
            !tgllahir ||
            !namabank ||
            !nomorrekening ||
            !npwp ||
            !linkfoto
        ) {
            return new Response(
                JSON.stringify({
                    message: "Failed",
                    error: `All fields are required, missing fields are ${!id ? 'id, ' : ''}${!alamat ? 'alamat, ' : ''}${!jeniskelamin ? 'jeniskelamin, ' : ''}${!nama ? 'nama, ' : ''}${!nohp ? 'nohp, ' : ''}${!pwd ? 'pwd, ' : ''}${!saldompay ? 'saldompay, ' : ''}${!tgllahir ? 'tgllahir, ' : ''}${!namabank ? 'namabank, ' : ''}${!nomorrekening ? 'nomorrekening, ' : ''}${!npwp ? 'npwp, ' : ''}${!linkfoto ? 'linkfoto, ' : ''}`,
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

        const pekerjaModel = new Pekerja();
        await pekerjaModel.create({
            id,
            npwp,
            namabank,
            nomorrekening,
            linkfoto,
            jumlahpesananaselesai: 0,
            rating: 0,
        })

        return new Response(
            JSON.stringify({
                message: "Success",
                data: newUser,
            }),
            { status: 201 }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: error.message,
            }),
            { status: 500 }
        )
    }
}
