"use client";
import React, { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { StatusCombobox } from "./elements/StatusCombobox";
import { Clock, Pen, SearchIcon } from "lucide-react";
import { statusPekerjaanCards } from "./const";
import { StatusPekerjaanProps } from "./interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const StatusPekerjaanModule = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPekerjaan, setfilteredPekerjaan] = useState<
    StatusPekerjaanProps[]
  >([]);

  useEffect(() => {
    const filterData = async () => {
      if (value === "" && search === "") {
        setfilteredPekerjaan(statusPekerjaanCards);
        return;
      }
      const filteredData = statusPekerjaanCards.filter(
        (card) =>
          (value === "" || card.status === value) &&
          (search === "" ||
            card.subCategory.toLowerCase().includes(search.toLowerCase()))
      );
      setfilteredPekerjaan(filteredData);
    };
    filterData();
  }, [value, search]);
  return (
    <div className="border rounded-lg px-2 md:px-8 py-4 shadow-lg flex flex-col gap-4">
      <div className="mx-auto flex md:flex-row flex-col gap-6 my-8">
        <Input
          Icon={SearchIcon}
          className="max-w-[400px]"
          placeholder="Cari Nama Jasa..."
          label={""}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StatusCombobox value={value} setValue={setValue} />
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
              className="flex md:flex-row flex-col max-md:gap-4 justify-between items-center  rounded-md shadow-sm px-10 border-2 py-5 "
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
              <h2 className="text-lg font-semibold text-green-500">
                {(500000).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h2>
              <div className="grid gap-3 w-[200px]">
                <Badge
                  className={cn(
                    "mx-auto",
                    card.status === "Selesai" && "bg-green-500",
                    card.status === "Dibatalkan" && "bg-red-500",
                    card.status === "Melakukan Pelayanan Jasa" &&
                      "bg-yellow-500",
                    card.status === "Menunggu Pekerja Berangkat" &&
                      "bg-blue-500",
                    card.status === "Tiba Di Lokasi" && "bg-purple-500"
                  )}
                >
                  {card.status}
                </Badge>
                <Button variant={"secondary"} className="mx-auto">
                  Update Status
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
