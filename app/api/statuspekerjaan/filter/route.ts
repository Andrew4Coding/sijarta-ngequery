import { SubkategoriJasa } from "@/database/models/subKategoriJasa";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { User } from "@/database/models/user";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { StatusPesanan } from "@/database/models/statusPesanan";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams;
  const id = query.get("id");
  const status = query.get("status");
  const namaKategori = query.get("namaKategori");

  const user = await new User().findBy("id", id);

  if (!user) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "User not found",
      }),
      { status: 404 }
    );
  }

  if (status && !namaKategori) {
    const statusPesanan = await new StatusPesanan().findBy("nama", status);

    if (!statusPesanan) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Status not found",
        }),
        { status: 404 }
      );
    }

    const statusPekerjaan = await Promise.all(
      (
        await new TrPemesananJasa().findMany("idpekerja", id)
      ).map(async (tr) => {
        const pemesananStatus = await new TrPemesananStatus().findBy(
          "idtrpemesanan",
          tr.id
        );

        if (
          pemesananStatus?.idstatus !==
          statusPesanan.id
        ) {
          return;
        }

        const subKategori = await new SubkategoriJasa().findBy(
          "id",
          tr.idkategorijasa
        );

        const pelanggan = await new User().findBy("id", tr.idpelanggan);

        return {
          id: tr.id,
          createdAt: tr.tglpemesanan,
          sesi: tr.sesi,
          todoDate: tr.waktupekerjaan,
          subCategory: subKategori?.namasubkategori,
          status: statusPesanan?.nama,
          price: tr.totalbiaya,
          assignner: pelanggan?.nama,
        };
      })
    );

    return new Response(
      JSON.stringify({
        message: "Success",
        data: statusPekerjaan.filter((s) => s),
      }),
      { status: 200 }
    );
  }

  if (!status && namaKategori) {
    const statusPekerjaan = await Promise.all(
      (
        await new TrPemesananJasa().findMany("idpekerja", id)
      ).map(async (tr) => {
        const pemesananStatus = await new TrPemesananStatus().findBy(
          "idtrpemesanan",
          tr.id
        );

        const statusPesanan = await new StatusPesanan().findBy(
          "id",
          pemesananStatus?.idstatus
        );

        const subKategori = await new SubkategoriJasa().findBy(
          "id",
          tr.idkategorijasa
        );

        if (!subKategori?.namasubkategori?.toLowerCase().includes(namaKategori.toLowerCase())) {
          return;
        }

        const pelanggan = await new User().findBy("id", tr.idpelanggan);

        return {
          id: tr.id,
          createdAt: tr.tglpemesanan,
          sesi: tr.sesi,
          todoDate: tr.waktupekerjaan,
          subCategory: subKategori?.namasubkategori,
          status: statusPesanan?.nama,
          price: tr.totalbiaya,
          assignner: pelanggan?.nama,
        };
      })
    );

    return new Response(
      JSON.stringify({
        message: "Success",
        data: statusPekerjaan.filter((s) => s)
      }),
      { status: 200 }
    );
  }

  if (status && namaKategori) {
    const statusPesanan = await new StatusPesanan().findBy("nama", status);

    if (!statusPesanan) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Status not found",
        }),
        { status: 404 }
      );
    }

    const statusPekerjaan = await Promise.all(
      (
        await new TrPemesananJasa().findMany("idpekerja", id)
      ).map(async (tr) => {
        const pemesananStatus = await new TrPemesananStatus().findBy(
          "idtrpemesanan",
          tr.id
        );

        if (
          pemesananStatus?.idstatus !==
          statusPesanan.id
        ) {
          return;
        }

        const subKategori = await new SubkategoriJasa().findBy(
          "id",
          tr.idkategorijasa
        );

        if (subKategori?.namasubkategori?.includes(namaKategori)) {
          return;
        }

        const pelanggan = await new User().findBy("id", tr.idpelanggan);

        return {
          id: tr.id,
          createdAt: tr.tglpemesanan,
          sesi: tr.sesi,
          todoDate: tr.waktupekerjaan,
          subCategory: subKategori?.namasubkategori,
          status: statusPesanan?.nama,
          price: tr.totalbiaya,
          assignner: pelanggan?.nama,
        };
      })
    );

    return new Response(
      JSON.stringify({
        message: "Success",
        data: statusPekerjaan.filter((s) => s),
      }),
      { status: 200 }
    );
  }
}
