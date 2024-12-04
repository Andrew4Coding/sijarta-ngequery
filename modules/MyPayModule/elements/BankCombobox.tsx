"use client";
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { listOfBank } from "../const";
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

export const BankCombobox = ({
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
          className="w-full justify-between mx-auto text-sm"
        >
          {value
            ? listOfBank.find((item) => item === value)
            : "Pilih Bank ..."}
          <ChevronDown className={cn(open ? "rotate-180" : "", "transition-transform")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[800px] p-0">
        <Command>
          <CommandInput placeholder="Cari bank..." />
          <CommandList>
            <CommandEmpty>Tidak ada Bank Terkait.</CommandEmpty>
            <CommandGroup>
              {listOfBank.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item ? "opacity-100" : "opacity-0"
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
