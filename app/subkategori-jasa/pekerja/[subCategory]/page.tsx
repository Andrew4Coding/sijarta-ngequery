import SubKategoriJasaPekerja from "@/modules/SubKategoriJasa/SubKategoriJasaPekerja";

async function page({ params }: {
  params: Promise<{ subCategory: string }>;
}) {
  const subcategory = (await params).subCategory.replace("-", " ");

  return (
    <SubKategoriJasaPekerja subCategory={subcategory} />
  );
}

export default page;