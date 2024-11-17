import React, { Suspense } from "react";
import { SubKategoriJasaPekerja } from "@/modules/SubKategoriJasaPekerja";
import { NextPage } from "next";

const page: NextPage<{
  params: {subCategory: string};
}> = ({ params }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPekerja />
    </Suspense>
  );
};

export default page;
