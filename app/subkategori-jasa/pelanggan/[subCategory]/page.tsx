import SubKategoriJasaPelanggan from "@/modules/SubKategoriJasa/SubKategoriJasaPelanggan";

async function page({ params }: {
  params: Promise<{ subCategory: string }>;
}) {
  const subcategory = (await params).subCategory.replace("-", " ");
  return (
    <SubKategoriJasaPelanggan subCategory={subcategory} />
  );
}

export default page;
