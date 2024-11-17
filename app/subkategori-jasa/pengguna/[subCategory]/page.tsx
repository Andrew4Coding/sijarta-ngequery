import React, { Suspense } from "react";
import { SubKategoriJasaPengguna } from "@/modules/SubKategoriJasaPengguna";
import { NextPage } from "next";

const page: NextPage<{
  params: { subCategory: string };
}> = ({ params }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPengguna subCategory={params.subCategory.replace("-", " ")} />
    </Suspense>
  );
};

export default page;
