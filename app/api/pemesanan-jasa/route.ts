import { Diskon } from "@/database/models/diskon";
import { MetodeBayar } from "@/database/models/metodeBayar";
import { StatusPesanan } from "@/database/models/statusPesanan";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { User } from "@/database/models/user";
import { DiskonType, MetodeBayarType } from "@/database/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      tglPemesanan,
      totalBiaya,
      idPelanggan,
      idDiskon,
      idMetodeBayar,
      sesi,
      idSubKategori,
    } = body;

    // Validasi diskon
    const diskonModel = new Diskon();
    if (idDiskon) {
      const queryDiskon = diskonModel.findBy("kode", idDiskon);

      if (!queryDiskon) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Kode diskon tidak valid.",
          }),
          { status: 400 }
        );
      }
    }

    const diskonValidatoin: DiskonType | null = await diskonModel.findBy(
      "kode",
      idDiskon
    );

    if (
      diskonValidatoin?.mintrpemesanan &&
      totalBiaya < diskonValidatoin.mintrpemesanan
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Total biaya tidak memenuhi syarat diskon.",
        }),
        { status: 400 }
      );
    }

    // Buat pesanan jasa
    const idPemesanan = uuidv4();
    const trPemesananJasaModel = new TrPemesananJasa();

    const query = await trPemesananJasaModel.create({
      id: idPemesanan,
      tglpemesanan: tglPemesanan,
      totalbiaya: totalBiaya,
      idpelanggan: idPelanggan,
      idkategorijasa: idSubKategori,
      sesi: sesi,
      iddiskon: idDiskon === "" ? null : idDiskon,
      idmetodebayar: idMetodeBayar,
    });

    const metodeMpay: MetodeBayarType | null = await new MetodeBayar().findBy(
      "nama",
      "MPay"
    );

    if (!metodeMpay) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Metode pembayaran tidak ditemukan.",
        }),
        { status: 500 }
      );
    }

    if (metodeMpay?.id === idMetodeBayar) {
      const statusPesanan = await new StatusPesanan().findBy(
        "nama",
        "Menunggu Pembayaran"
      );

      if (!statusPesanan) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Status pesanan tidak ditemukan.",
          }),
          { status: 500 }
        );
      }

      await new TrPemesananStatus().create({
        idtrpemesanan: idPemesanan,
        idstatus: statusPesanan.id,
        tglwaktu: new Date(),
      });
    } else {
      const statusPesanan = await new StatusPesanan().findBy(
        "nama",
        "Mencari Pekerja Terdekat"
      );

      if (!statusPesanan) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Status pesanan tidak ditemukan.",
          }),
          { status: 500 }
        );
      }

      await new TrPemesananStatus().create({
        idtrpemesanan: idPemesanan,
        idstatus: statusPesanan.id,
        tglwaktu: new Date(),
      });
    }

    // Reduce user mpay
    const userModel = new User();

    // Check if user saldo is enoough
    if (idMetodeBayar === metodeMpay?.id) {
      const user = await userModel.findBy("id", idPelanggan);
      if (user?.saldompay && user.saldompay < totalBiaya) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Saldo MPay tidak mencukupi.",
          }),
          { status: 400 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Pesanan berhasil dibuat.",
        id: query.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error.",
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
}
