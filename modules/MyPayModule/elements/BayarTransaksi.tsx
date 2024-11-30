"use client";
import { Button } from "@/components/ui/button";
import { BayarCombobox } from "./BayarCombobox";
import { useEffect, useState } from "react";
import { UnPaidPesananInterface } from "../interface";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";

export const BayarTransaksi = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<UnPaidPesananInterface[]>([]);
  const { userData, role } = useUserData();

  async function onSubmit(values: string) {
    if (values === "") {
      setError("Pilih tagihan terlebih dahulu");
      return;
    }

    setIsLoading(true);
    const response = await fetch("/api/mypay/transaksi", {
      method: "POST",
      body: JSON.stringify({
        userId: userData.id,
        role,
        category: "Membayar Transaksi",
        nominal: Number(data.find((data) => data.id === values)?.nominal),
        pemesananJasaId: values,
      }),
    });

    const result = await response.json();
    toast.promise(
      response.ok
        ? Promise.resolve(result.message)
        : Promise.reject(result.error),
      {
        loading: "Loading...",
        success: "Payment Success",
        error: result.error,
      }
    );

    setIsLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/mypay/unpaidJasa?id=${userId}`);

      if (response.ok) {
        const responseData = await response.json();
        const data: UnPaidPesananInterface[] = responseData.data;
        setData(data);
      } else {
        const error = await response.json();
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={() => onSubmit(value)} className="flex flex-col gap-5">
        <h1 className="font-bold text-center text-[20px]">Pilih Tagihan</h1>
        <BayarCombobox data={data} value={value} setValue={setValue} />
        {error !== "" && (
          <p className="text-red-500 font-semibold text-xs">{error}</p>
        )}
        {value !== "" && (
          <>
            {data
              .filter((data) => data.id === value)
              .map((data) => (
                <div
                  key={data.id}
                  className="flex flex-col gap-3 border border-[#D9D9D9] rounded-[12px] px-5 py-5"
                >
                  <p className="font-semibold">
                    Nominal:{" "}
                    <span className="text-red-500">
                      {Number(data.nominal).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Sub Kategori: {data.subKategori}
                  </p>
                  <p className="font-semibold">
                    Tanggal Pemesanan:{" "}
                    {new Date(data.tanggalPemesanan).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p className="font-semibold">
                    Tanggal Pekerjaan:{" "}
                    {new Date(data.tanggalPekerjaan).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p className="font-semibold">
                    Status: <span className="text-red-500">{data.status}</span>
                  </p>
                </div>
              ))}
          </>
        )}
        <Button disabled={isLoading} variant={"secondary"} type="submit">
          Bayar
        </Button>
      </form>
    </div>
  );
};
