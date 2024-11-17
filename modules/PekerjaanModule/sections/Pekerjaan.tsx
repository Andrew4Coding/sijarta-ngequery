"use client";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import { KategoriCombobox } from "../elements/KategoriCombobox";
import { SubKategoriCombobox } from "../elements/SubKategoriCombobox";
import { pekerjaanCards, pekerjaanCategories } from "../const";
import { Button } from "@/components/ui/button";
import { Pen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    <TabsContent value="pekerjaan">
      <div className="border rounded-lg px-2 md:px-8 py-4 shadow-lg flex flex-col gap-4">
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
        <div className="h-[70vh] overflow-y-auto flex flex-col gap-6 px-2 md:px-8">
          {filteredPekerjaan.length === 0 ? (
            <div className="text-center my-auto text-2xl font-medium">
              Tidak ada pekerjaan yang tersedia.
            </div>
          ) : (
            filteredPekerjaan.map((card) => (
              <div
                key={card.id}
                className="flex md:flex-row flex-col max-md:gap-4 justify-between items-center bg-white rounded-md shadow-sm border-2 px-10 py-6"
              >
                <div className="grid md:grid-cols-2 gap-3 md:gap-8 max-md:text-center">
                  <div className="md:border-r md:pr-6 space-y-3 w-[150px]">
                    <Badge>{card.subCategory}</Badge>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Pen size={20} />{" "}
                      {new Date(card.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold">{card.assignner}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock size={20} />{" "}
                      {new Date(card.todoDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <h2 className="text-base md:text-lg font-semibold text-green-500">
                  {(500000).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h2>
                <Button variant={"outline"}>Kerjakan Pesanan</Button>
              </div>
            ))
          )}
        </div>
      </div>
    </TabsContent>
  );
};
