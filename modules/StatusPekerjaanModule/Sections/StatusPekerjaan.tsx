"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { StatusCombobox } from "../elements/StatusCombobox";
import { SearchIcon } from "lucide-react";
import { StatusPekerjaanProps } from "../interface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const StatusPekerjaan = ({ userId }: { userId: string }) => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPekerjaan, setfilteredPekerjaan] = useState<
    StatusPekerjaanProps[]
  >([]);

  const fetchAllPekerjaan = async () => {
    const response = await fetch(`/api/statuspekerjaan?id=${userId}`);
    if (response.ok) {
      const responseData = await response.json();
      const data: StatusPekerjaanProps[] = responseData.data;
      setfilteredPekerjaan(data);
    } else {
      const error = await response.json();
      console.log(error);
    }
  };

  const fetchPekerjaanBySearchAndStatus = async (
    search: string | null,
    status: string | null
  ) => {
    const response = await fetch(
      `/api/statuspekerjaan/filter?id=${userId}&namaKategori=${search}&status=${status}`
    );
    if (response.ok) {
      const responseData = await response.json();
      const data: StatusPekerjaanProps[] = responseData.data;
      setfilteredPekerjaan(data);
    } else {
      const error = await response.json();
      console.log(error);
    }
  };

  useEffect(() => {
    const filterData = async () => {
      if (value === "" && search === "") {
        fetchAllPekerjaan();
        return;
      }
      fetchPekerjaanBySearchAndStatus(search, value);
    };
    filterData();
  }, [value, search]);

  useEffect(() => {
    fetchAllPekerjaan();
  }, []);

  return (
    <section className="flex flex-col gap-12 z-10">
      <div className="mx-auto flex md:flex-row flex-col gap-3">
        <Input
          Icon={SearchIcon}
          className="md:w-[400px]"
          placeholder="Cari Nama Jasa..."
          label={""}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StatusCombobox value={value} setValue={setValue} />
      </div>
      <div className="flex flex-col gap-6">
        {filteredPekerjaan.length === 0 ? (
          <div className="text-center my-auto text-2xl font-medium">
            Tidak ada pekerjaan yang tersedia.
          </div>
        ) : (
          filteredPekerjaan.map((card) => (
            <div
              key={card.id}
              className="flex lg:flex-row flex-col lg:gap-5 h-full"
            >
              <div className="flex flex-col font-bold w-full lg:w-[30%] xl:w-1/5">
                <div className="bg-green-500 h-full flex items-center justify-center rounded-t-[12px] py-5 md:py-6 text-[20px] md:text-[24px] text-white text-center">
                  {card.subCategory}
                </div>
                <div className="lg:rounded-b-[12px] flex items-center justify-center h-full text-green-500 py-5 md:py-6 border border-[#D9D9D9] text-[16px] md:text-[20px] text-center bg-white">
                  {new Date(card.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full bg-white rounded-b-[20px] lg:rounded-[20px] max-lg:border-t-0 border border-[#D9D9D9] p-6 md:px-9 md:py-8">
                <h2
                  className={cn(
                    "text-center text-[16px] md:text-[20px] font-semibold py-3 md:py-4 border border-[#D9D9D9] rounded-[12px]",
                    card.status === "Pesanan Selesai" && "text-green-500",
                    card.status === "Dibatalkan" && "text-[#F27575]",
                    card.status === "Pelayanan Jasa Sedang Dilakukan" &&
                      "text-[#F2AD75]",
                    card.status === "Menunggu Pekerja Berangkat" &&
                      "text-[#AF75F2]",
                    card.status === "Pekerja Tiba di Lokasi" && "text-[#759EF2]"
                  )}
                >
                  {card.status}
                </h2>
                <div className="grid md:grid-cols-3 items-center max-md:gap-5">
                  <div className="font-bold max-md:text-center">
                    <h2 className="text-[24px] md:text-[28px]">
                      {card.assignner}
                    </h2>
                    <p className="text-[16px] md:text-[20px] text-[#B2B2B2]">
                      {card.sesi} Sesi{", "}
                      {new Date(card.todoDate).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {", "}
                      {new Date(card.todoDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <h2 className="text-lg mx-auto text-[24px] md:text-[28px] font-bold text-green-500">
                    {(500000).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </h2>
                  <Button
                    variant={"secondary"}
                    className="md:text-[20px] md:ml-auto max-h-[60px]"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
