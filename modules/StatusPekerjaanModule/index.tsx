import React from "react";
import { StatusPekerjaan } from "./Sections/StatusPekerjaan";
import Image from "next/image";

export const StatusPekerjaanModule = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 z-10">
      <div className="absolute top-0 w-full left-0 h-full z-[1]">
        <Image src="/images/StatusPekerjaanBG.png" alt="Pekerjaan" fill className="" />
      </div>
      <h1 className="header z-10 text-[60px] mt-[70px] font-newake text-green-500 text-center">
        Status Pekerjaan
      </h1>
      <StatusPekerjaan />
    </main>
  );
};
