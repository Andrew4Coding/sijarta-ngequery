"use client";
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { pekerjaanCategories } from "../const";
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
}: {
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
          className="sm:w-[300px] justify-between mx-auto"
        >
          {value
            ? pekerjaanCategories.find((category) => category.category === value)?.category
            : "Pilih Kategori Pekerjaan"}
          <ChevronDown className={cn(open ? "rotate-180" : "", "transition-transform")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Cari kategori..." />
          <CommandList>
            <CommandEmpty>Tidak ada Kategori Terkait.</CommandEmpty>
            <CommandGroup>
              {pekerjaanCategories.map((category) => (
                <CommandItem
                  key={category.category}
                  value={category.category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category.category}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.category ? "opacity-100" : "opacity-0"
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
