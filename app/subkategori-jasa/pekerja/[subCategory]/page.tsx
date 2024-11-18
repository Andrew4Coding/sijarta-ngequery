import { SubKategoriJasaPekerja } from "@/modules/SubKategoriJasa/SubKategoriJasaPekerja";
import { Suspense } from "react";

function page({ params }: {
  params: {
    subCategory: string;
  };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPekerja subCategory={params.subCategory.replace("-", " ")} />
    </Suspense>
  );
}

export default page;
