"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pekerjaan } from "./sections/Pekerjaan";
import { StatusPekerjaan } from "./sections/StatusPekerjaan";
import { useSearchParams } from "next/navigation";

export const PekerjaanModule = () => {
  const searchParams = useSearchParams();
  const tabs = searchParams.get('tabs') ?? 'pekerjaan';

  return (
    <main className="min-h-screen flex justify-center px-10 md:px-32 my-40">
      <Tabs
        defaultValue={tabs}
        className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="pekerjaan" className="w-full">
            Mencari Pekerjaan
          </TabsTrigger>
          <TabsTrigger value="history" className="w-full">
            Status Pekerjaan
          </TabsTrigger>
        </TabsList>
        <Pekerjaan />
        <StatusPekerjaan />
      </Tabs>
    </main>
  );
};
