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

export const KategoriCombobox = ({
  value,
  setValue,
  categories,
}: {
  value: string;
  setValue: (value: string) => void;
  categories: string[];
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
            ? categories.find((category) => category === value)
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
              {categories.map((category) => (
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
