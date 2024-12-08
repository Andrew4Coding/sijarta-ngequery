import { User } from "@/database/models/user";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { StatusPesanan } from "@/database/models/statusPesanan";

interface ApplyPekerjaanInterface {
    userId: string;
    role: string;
    trPemesananJasaId: string;
}

export async function POST(req: Request) {
    const {
        userId,
        role,
        trPemesananJasaId,
    }: ApplyPekerjaanInterface = await req.json();

    if (!userId || !trPemesananJasaId) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "Missing fields are required",
            }),
            { status: 400 }
        );
    }

    const user = await new User().findBy("id", userId);

    if (!user) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "Unauthorized",
            }),
            { status: 401 }
        );
    }

    if ("Pelanggan" === role) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "Unauthorized",
            }),
            { status: 401 }
        );
    }

    const pemesananJasa = await new TrPemesananJasa().findBy("id", trPemesananJasaId);

    if (!pemesananJasa) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "Pemesanan Jasa not found",
            }),
            { status: 404 }
        );
    }

    if (pemesananJasa.idpekerja !== null) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "Pemesanan Jasa has been taken",
            }),
            { status: 400 }
        );
    }
 
    const status = await new StatusPesanan().findBy("nama", "Menunggu Pekerja Berangkat");

    if (!status) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: "Status not found",
            }),
            { status: 404 }
        );
    }

    await new TrPemesananStatus().create({
        idtrpemesanan: pemesananJasa.id,
        idstatus: status.id,
        tglwaktu: new Date(),
    });

    await new TrPemesananJasa().update("id", trPemesananJasaId, {
        tglpekerjaan: new Date(),
        waktupekerjaan: new Date(new Date().getTime() + Number(pemesananJasa.sesi) * 24 * 60 * 60 * 1000),
        idpekerja: userId,
    });

    return new Response(
        JSON.stringify({
            message: "Success",
        }),
        { status: 201 }
    );
}