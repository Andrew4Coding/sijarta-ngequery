"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { KategoriCombobox } from "../elements/KategoriCombobox";
import { SubKategoriCombobox } from "../elements/SubKategoriCombobox";
import { PekerjaanCardProps, subKategoriInterface } from "../interface";

export const Pekerjaan = ({ userId }: { userId: string }) => {
  const [value, setValue] = useState("");
  const [subValue, setSubValue] = useState("");
  const [filteredPekerjaan, setfilteredPekerjaan] = useState<
    PekerjaanCardProps[]
  >([]);
  const [subCategories, setSubCategories] = useState<subKategoriInterface[]>(
    []
  );

  const fetchAllPekerjaan = async () => {
    const response = await fetch(`/api/pekerjaan?id=${userId}`);
    if (response.ok) {
      const responseData = await response.json();
      const data: PekerjaanCardProps[] = responseData.data.availableJobs;
      setfilteredPekerjaan(data);
      setSubCategories(responseData.data.subKategoriPekerja);
      console.log(responseData);
    } else {
      const error = await response.json();
      console.log(error);
    }
  };

  const fetchPekerjaanBySubCategory = async (subCategory: string) => {
    const response = await fetch(
      `/api/pekerjaan?id=${userId}&subCategory=${subCategory}`
    );
    if (response.ok) {
      const responseData = await response.json();
      const data: PekerjaanCardProps[] = responseData.data.availableJobs;
      setfilteredPekerjaan(data);
    } else {
      const error = await response.json();
      console.log(error);
    }
  };

  useEffect(() => {
    const filterData = async () => {
      if (value === "") {
        setSubValue("");
      }

      if (value === "" && subValue === "") {
        fetchAllPekerjaan();
        return;
      }
      fetchPekerjaanBySubCategory(subValue);
    };
    filterData();
  }, [value, subValue]);

  useEffect(() => {
    fetchAllPekerjaan();
  }, []);

  return (
    <section className="flex flex-col gap-12 z-10">
      <div className="mx-auto md:space-x-4 max-md:flex max-md:flex-col max-md:gap-1">
        <KategoriCombobox
          value={value}
          setValue={setValue}
          categories={subCategories.map((category) => category.namaKategori)}
        />
        <SubKategoriCombobox
          value={subValue}
          setValue={setSubValue}
          subCategory={
            subCategories.find((status) => status.namaKategori === value)
              ?.subKategori || []
          }
        />
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
              className="flex lg:flex-row flex-col lg:gap-5 items-center"
            >
              <div className="flex flex-col font-bold w-full lg:w-[30%] xl:w-1/5">
                <div className="bg-green-500 rounded-t-[12px] py-5 md:py-6 text-[20px] md:text-[24px] text-white text-center">
                  {card.subCategory}
                </div>
                <div className="lg:rounded-b-[12px] text-green-500 py-5 md:py-6 border border-[#D9D9D9] text-[16px] md:text-[20px] text-center bg-white">
                  {new Date(card.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="w-full h-full flex md:flex-row flex-col max-md:gap-4 justify-between items-center bg-white rounded-b-[20px] lg:rounded-[20px] max-lg:border-t-0 border border-[#D9D9D9] p-6 md:p-9">
                <div className="md:space-y-4 font-bold max-md:text-center">
                  <h2 className="text-[24px] md:text-[28px]">
                    {card.assignner}
                  </h2>
                  <p className="text-[16px] md:text-[20px] text-[#B2B2B2]">
                    {card.sesi} Sesi
                  </p>
                </div>
                <h2 className="text-lg text-[24px] md:text-[28px] font-bold text-green-500">
                  {(500000).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h2>
                <Button
                  variant={"secondary"}
                  className="md:text-[20px] max-md:w-full"
                >
                  Kerjakan Pesanan
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
