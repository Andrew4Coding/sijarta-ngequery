"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { pekerjaanCards, pekerjaanCategories } from "../const";
import { KategoriCombobox } from "../elements/KategoriCombobox";
import { SubKategoriCombobox } from "../elements/SubKategoriCombobox";
import { PekerjaanCardProps } from "../interface";

export const Pekerjaan = () => {
  const [value, setValue] = useState("");
  const [subValue, setSubValue] = useState("");
  const [filteredPekerjaan, setfilteredPekerjaan] = useState<
    PekerjaanCardProps[]
  >([]);

  useEffect(() => {
    const filterData = async () => {
      if (value === "" && subValue === "") {
        setfilteredPekerjaan(pekerjaanCards);
        return;
      }
      const filteredData = pekerjaanCards.filter(
        (card) => card.subCategory === subValue && value !== ""
      );
      setfilteredPekerjaan(filteredData);
    };
    filterData();
  }, [value, subValue]);
  return (
    <section className="flex flex-col gap-12">
      <div className="mx-auto md:space-x-4 max-md:flex max-md:flex-col max-md:gap-1">
        <KategoriCombobox value={value} setValue={setValue} />
        <SubKategoriCombobox
          value={subValue}
          setValue={setSubValue}
          subCategory={
            pekerjaanCategories.find((card) => card.category === value)
              ?.subCategories || []
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
            <div key={card.id} className="flex lg:flex-row flex-col lg:gap-5 items-center">
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
                <div className="space-y-4 font-bold">
                  <h2 className="text-[24px] md:text-[28px]">{card.assignner}</h2>
                  <p className="text-[16px] md:text-[20px] text-[#B2B2B2]">
                    {new Date(card.todoDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <h2 className="text-lg text-[24px] md:text-[28px] font-bold text-green-500">
                  {(500000).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h2>
                <Button variant={'secondary'} className="md:text-[20px]">Kerjakan Pesanan</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
