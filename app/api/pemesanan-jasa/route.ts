import { Diskon } from "@/database/models/diskon";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { DiskonType } from "@/database/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tglPemesanan, totalBiaya, idPelanggan, idDiskon, idMetodeBayar, sesi, idSubKategori } = body;

    // Validasi diskon
    const diskonModel = new Diskon();
    if (idDiskon) {
      const queryDiskon = diskonModel.findBy("kode", idDiskon);

      if (!queryDiskon) {
        return new Response(
          JSON.stringify({ success: false, message: "Kode diskon tidak valid." }),
          { status: 400 }
        );
      }
    }

    const diskonValidatoin: DiskonType | null = await diskonModel.findBy('kode', idDiskon);

    if (diskonValidatoin?.mintrpemesanan && totalBiaya < diskonValidatoin.mintrpemesanan) {
      return new Response(
        JSON.stringify({ success: false, message: "Total biaya tidak memenuhi syarat diskon." }),
        { status: 400 }
      );
    }

    // Buat pesanan jasa
    const idPemesanan = uuidv4();
    const trPemesananJasaModel = new TrPemesananJasa();

    const query = await trPemesananJasaModel.create({
      id: idPemesanan,
      tglpekerjaan: tglPemesanan,
      tglpemesanan: tglPemesanan,
      totalbiaya: totalBiaya,
      idpelanggan: idPelanggan,
      waktupekerjaan: new Date(),
      idkategorijasa: idSubKategori,
      sesi: sesi,
      iddiskon: idDiskon,
      idmetodebayar: idMetodeBayar,
    })

    return new Response(
      JSON.stringify({ success: true, message: "Pesanan berhasil dibuat.", id: query.id }),
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, message: "Server error.", error: errorMessage }),
      { status: 500 }
    );
  }
}
