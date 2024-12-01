"use client";
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { paymentTypeData } from "../const";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const KategoriCombobox = ({
  value,
  setValue,
  isPelanggan,
}: {
  value: string;
  setValue: (value: string) => void;
  isPelanggan: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-4 py-5 h-full text-sm font-medium"
        >
          {value
            ? paymentTypeData.find((paymentType) => paymentType === value)
            : "Pilih Kategori Transaksi"}
          <ChevronDown className={cn(open ? "rotate-180" : "", "transition-transform")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[800px] p-0">
        <Command className="w-full">
          <CommandInput placeholder="Cari kategori..." />
          <CommandList>
            <CommandEmpty>Tidak ada Kategori Terkait.</CommandEmpty>
            <CommandGroup>
              {paymentTypeData.map((paymentType) => {
                if (!isPelanggan && paymentType === "Membayar Transaksi") {
                  return null;
                }
                return (
                  <CommandItem
                    key={paymentType}
                    value={paymentType}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {paymentType}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === paymentType ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
