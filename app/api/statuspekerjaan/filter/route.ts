import { StatusPesanan } from "@/database/models/statusPesanan";
import { User } from "@/database/models/user";

export async function GET(req: Request) {
  try {

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
  
    const statusPesananModel = new StatusPesanan();
    if (status && !namaKategori) {
      const statusPesanan = await statusPesananModel.findBy("nama", status);
  
      if (!statusPesanan) {
        return new Response(
          JSON.stringify({
            message: "Failed",
            error: "Status not found",
          }),
          { status: 404 }
        );
      }
  
      const statusPekerjaan = await statusPesananModel.customQuery(`
        SELECT
          tr.id AS order_id,
          tr.tglpemesanan AS created_at,
          tr.sesi,
          tr.waktupekerjaan AS todo_date,
          subkategori.namasubkategori AS sub_category,
          status.nama AS status,
          tr.totalbiaya AS price,
          pelanggan.nama AS assignner
      FROM
          TR_PEMESANAN_JASA tr
      JOIN
          TR_PEMESANAN_STATUS ts ON tr.id = ts.idtrpemesanan
      JOIN
          STATUS_PESANAN status ON ts.idstatus = status.id
      JOIN
          SUBKATEGORI_JASA subkategori ON tr.idkategorijasa = subkategori.id
      JOIN
          USERTABLE pelanggan ON tr.idpelanggan = pelanggan.id
      WHERE
          tr.idpekerja = '${id}' -- Replace :id with the worker's id
          AND ts.idstatus = '${statusPesanan.id}';
      `)
  
      return new Response(
        JSON.stringify({
          message: "Success",
          data: statusPekerjaan.filter((s) => s),
        }),
        { status: 200 }
      );
    }
  
    if (!status && namaKategori) {
      const statusPekerjaan = await statusPesananModel.customQuery(`
        SELECT
          tr.id AS order_id,
          tr.tglpemesanan AS created_at,
          tr.sesi,
          tr.waktupekerjaan AS todo_date,
          subkategori.namasubkategori AS sub_category,
          status.nama AS status,
          tr.totalbiaya AS price,
          pelanggan.nama AS assignner
      FROM
          TR_PEMESANAN_JASA tr
      JOIN
          TR_PEMESANAN_STATUS ts ON tr.id = ts.idtrpemesanan
      JOIN
          STATUS_PESANAN status ON ts.idstatus = status.id
      JOIN
          SUBKATEGORI_JASA subkategori ON tr.idkategorijasa = subkategori.id
      JOIN
          USERTABLE pelanggan ON tr.idpelanggan = pelanggan.id
      WHERE
          tr.idpekerja = '${id}'
          AND LOWER(subkategori.namasubkategori) LIKE LOWER('%' || '${namaKategori}' || '%');
    
      `)
  
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
  
      const statusPekerjaan = await statusPesananModel.customQuery(`
        SELECT
            tr.id AS order_id,
            tr.tglpemesanan AS created_at,
            tr.sesi,
            tr.waktupekerjaan AS todo_date,
            subkategori.namasubkategori AS sub_category,
            status.nama AS status,
            tr.totalbiaya AS price,
            pelanggan.nama AS assignner
        FROM
            TR_PEMESANAN_JASA tr
        JOIN
            TR_PEMESANAN_STATUS ts ON tr.id = ts.idtrpemesanan
        JOIN
            STATUS_PESANAN status ON ts.idstatus = status.id
        JOIN
            SUBKATEGORI_JASA subkategori ON tr.idkategorijasa = subkategori.id
        JOIN
            USERTABLE pelanggan ON tr.idpelanggan = pelanggan.id
        WHERE
            tr.idpekerja = '${id}'
            AND ts.idstatus = '${statusPesanan.id}'
            AND subkategori.namasubkategori NOT LIKE '${namaKategori}';
        `)
  
      return new Response(
        JSON.stringify({
          message: "Success",
          data: statusPekerjaan.filter((s) => s),
        }),
        { status: 200 }
      );
    }
  }
  catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
