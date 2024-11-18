import React, { Suspense } from "react";
import { NextPage } from "next";
import { SubKategoriJasaPekerja } from "@/modules/SubKategoriJasa/SubKategoriJasaPekerja";

const page: NextPage<{
  params: {subCategory: string};
}> = ({ params }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPekerja subCategory={params.subCategory.replace("-", " ")} />
    </Suspense>
  );
};

export default page;
