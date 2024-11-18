import { SubKategoriJasaPekerja } from "@/modules/SubKategoriJasa/SubKategoriJasaPekerja";
import { Suspense } from "react";

async function page({ params }: {
  params: Promise<{ subCategory: string }>;
}) {
  const subcategory = (await params).subCategory.replace("-", " ");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubKategoriJasaPekerja subCategory={subcategory} />
    </Suspense>
  );
}

export default page;
