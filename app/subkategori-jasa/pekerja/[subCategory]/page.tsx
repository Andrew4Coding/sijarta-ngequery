import SubKategoriJasaPekerja from "@/modules/SubKategoriJasa/SubKategoriJasaPekerja";

function Page({ params }: { params: { subCategory: string } }) {
  const subcategory = params.subCategory.replace(/-/g, " ");

  return <SubKategoriJasaPekerja subCategory={subcategory} />;
}

export default Page;
