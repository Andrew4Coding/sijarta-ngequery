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
import { statusPekerjaan } from "../const";

export const StatusCombobox = ({
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
          className="w-full justify-between mx-auto"
        >
          {value
            ? statusPekerjaan.find((status) => status === value)
            : "Status Pekerjaan"}
          <ChevronDown className={cn(open ? "rotate-180" : "", "transition-transform")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Cari status..." />
          <CommandList>
            <CommandEmpty>Tidak ada Kategori Terkait.</CommandEmpty>
            <CommandGroup>
              {statusPekerjaan.map((status) => (
                <CommandItem
                  key={status}
                  value={status}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {status}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === status ? "opacity-100" : "opacity-0"
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
