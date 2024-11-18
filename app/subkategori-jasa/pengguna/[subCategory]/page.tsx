import SubKategoriJasaPengguna from "@/modules/SubKategoriJasa/SubKategoriJasaPengguna";
import { Suspense } from "react";

async function page({ params }: {
  params: Promise<{ subCategory: string }>;
}) {
  const subcategory = (await params).subCategory.replace("-", " ");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPengguna subCategory={subcategory} />
    </Suspense>
  );
}

export default page;
