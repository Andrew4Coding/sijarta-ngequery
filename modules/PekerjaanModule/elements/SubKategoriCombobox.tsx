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

export const SubKategoriCombobox = ({
  value,
  setValue,
  subCategory,
}: {
  value: string;
  setValue: (value: string) => void;
  subCategory: string[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="sm:w-[300px] justify-between mx-auto mb-8 mt-4"
        >
          {value
            ? subCategory.find((category) => category === value)
            : "Pilih Subkategori Pekerjaan"}
          <ChevronDown className={cn(open ? "rotate-180" : "", "transition-transform")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Cari Sub kategori..." />
          <CommandList>
            <CommandEmpty>Tidak ada Kategori Terkait.</CommandEmpty>
            <CommandGroup>
              {subCategory.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category ? "opacity-100" : "opacity-0"
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
