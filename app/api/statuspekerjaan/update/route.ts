import { StatusPesanan } from "@/database/models/statusPesanan";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { User } from "@/database/models/user";

export async function PATCH(req: Request) {
  const { userId, trPemesananJasaId, status } = await req.json();

  if (!userId || !trPemesananJasaId || !status) {
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

  const trPemesananStatus = await new TrPemesananStatus().findBy(
    "idtrpemesanan",
    trPemesananJasaId
  );

  if (!trPemesananStatus) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Tr Pemesanan Status not found",
      }),
      { status: 404 }
    );
  }

  let newStatus = "";
  switch (status) {
    case "Menunggu Pekerja Berangkat":
      newStatus = "Pekerja Tiba di Lokasi";
      break;
    case "Pekerja Tiba di Lokasi":
      newStatus = "Pelayanan Jasa Sedang Dilakukan";
      break;
    case "Pelayanan Jasa Sedang Dilakukan":
      newStatus = "Pesanan Selesai";
      break;
    default:
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Status not found",
        }),
        { status: 404 }
      );
  }

  const idStatus = await new StatusPesanan().findBy("nama", newStatus);

  if (!idStatus) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Status not found",
      }),
      { status: 404 }
    );
  }

  await new TrPemesananStatus().update("idtrpemesanan", trPemesananJasaId, {
    idstatus: idStatus.id,
  });

  return new Response(
    JSON.stringify({
      message: "Success",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
