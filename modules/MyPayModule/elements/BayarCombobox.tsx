"use client";
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
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
import { UnPaidPesananInterface } from "../interface";

export const BayarCombobox = ({
  data,
  value,
  setValue,
}: {
  data: UnPaidPesananInterface[];
  value: string;
  setValue: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mx-auto"
        >
          {value
            ? data.find((item) => item.id === value)?.subKategori
            : "Pilih Kategori Transaksi"}
          <ChevronDown className={cn(open ? "rotate-180" : "", "transition-transform")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[800px] p-0">
        <Command>
          <CommandInput placeholder="Cari kategori..." />
          <CommandList>
            <CommandEmpty>Tidak ada Sub Kategori.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.subKategori}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.subKategori ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
