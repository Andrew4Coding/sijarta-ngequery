import SubKategoriJasaPengguna from "@/modules/SubKategoriJasa/SubKategoriJasaPengguna";
import { Suspense } from "react";

function page({ params }: {
  params: {
    subCategory: string;
  };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPengguna subCategory={params.subCategory.replace("-", " ")} />
    </Suspense>
  );
}

export default page;
