import SubKategoriJasaPengguna from "@/modules/SubKategoriJasa/SubKategoriJasaPengguna";

async function page({ params }: {
  params: Promise<{ subCategory: string }>;
}) {
  const subcategory = (await params).subCategory.replace("-", " ");
  return (
    <SubKategoriJasaPengguna subCategory={subcategory} />
  );
}

export default page;
