"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pekerjaan } from "./sections/Pekerjaan";
import { StatusPekerjaan } from "./sections/StatusPekerjaan";

export const PekerjaanModule = () => {
  return (
    <main className="min-h-screen flex justify-center py-[10vh] md:px-[10vw] px-[5vw]">
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
