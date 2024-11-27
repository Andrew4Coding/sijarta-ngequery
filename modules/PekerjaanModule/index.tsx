"use client";
import { Pekerjaan } from "./sections/Pekerjaan";

export const PekerjaanModule = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32">
      <h1 className="header text-[60px] mt-[70px] font-newake text-green-500 text-center">Pekerjaan</h1>
      <Pekerjaan />
    </main>
  );
};
