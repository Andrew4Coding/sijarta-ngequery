"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pekerjaan } from "./sections/Pekerjaan";
import { StatusPekerjaan } from "./sections/StatusPekerjaan";

export const PekerjaanModule = () => {
  return (
    <main className="min-h-screen flex justify-center px-10 md:px-32 my-40">
      <Tabs defaultValue="pekerjaan" className="w-full">
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
