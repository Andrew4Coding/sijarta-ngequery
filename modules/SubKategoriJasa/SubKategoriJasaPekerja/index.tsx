"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";

interface Session {
  sesi: number;
  harga: number;
}

interface Worker {
  id: string;
  nama: string;
  linkfoto: string;
  rating: number;
  jumlahpesananaselesai: number;
  nohp: string;
  tgllahir: string;
  alamat: string;
}

interface SubCategoryInfo {
  namasubkategori: string;
  deskripsi: string;
  namakategori: string;
}

const SubKategoriJasaPekerja = ({ subCategory }: { subCategory: string }) => {
  const [subcategoryInfo, setSubcategoryInfo] =
    useState<SubCategoryInfo | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useUserData();

  const fetchSubcategoryData = async () => {
    try {
      const formattedSubCategory = subCategory.replace(/-/g, " ");
      const response = await fetch(
        `/api/subkategori?name=${encodeURIComponent(formattedSubCategory)}`
      );
      if (!response.ok) throw new Error("Failed to fetch subcategory data");

      const result = await response.json();
      setSubcategoryInfo(result.data.subcategory);
      setSessions(result.data.sessions);

      if (result.data.subcategory.subkategoriid) {
        await fetchWorkers(result.data.subcategory.subkategoriid);
      }
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      toast.error("Gagal memuat subkategori.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubcategoryData();
  }, [subCategory]);

  const fetchWorkers = async (subkategoriId: string) => {
    try {
      const response = await fetch(
        `/api/pekerja?subkategoriId=${subkategoriId}`
      );
      if (!response.ok) throw new Error("Failed to fetch workers");

      const result = await response.json();
      setWorkers(result.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
      toast.error("Gagal memuat daftar pekerja.");
    }
  };

  const handleJoin = async (subCategory: string) => {
    setIsLoading(true);
    const response = await fetch(
      `/api/subkategori/pekerja?pekerjaId=${userData.id}&kategoriJasa=${subCategory}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      const result = await response.json();
      toast.error(result.message);
      return;
    }
    fetchSubcategoryData(); 
    toast.success("Anda berhasil bergabung sebagai pekerja!");
    setIsLoading(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!subcategoryInfo) return <p>Subcategory not found</p>;

  return (
    <main className="bg-[#f8f8f8] min-h-screen pt-[132px] pb-[32px] px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mb-10">
        <div className="flex">
          <div className="flex-1 h-[46px] bg-[#1ab35f] text-center text-white text-xl font-bold rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center">
            {subcategoryInfo.namakategori}
          </div>
          <div className="flex-1 h-[46px] text-center text-[#1ab35f] text-xl font-bold rounded-tr-[20px] rounded-br-[20px] border border-[#d9d9d9] flex items-center justify-center">
            {subcategoryInfo.namasubkategori}
          </div>
        </div>
        <p className="text-black text-base font-medium mt-5">
          {subcategoryInfo.deskripsi}
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">
          Pilihan Sesi Layanan
        </h2>
        {sessions.map((session, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[#e8f7ef] rounded-xl p-5 mb-4"
          >
            <div>
              <h3 className="text-black text-xl font-bold">
                Sesi {session.sesi}
              </h3>
              <p className="text-black text-xl font-medium">
                Rp {session.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
        {!workers.find((worker) => worker.id === userData.id) && (
          <Button
            disabled={isLoading}
            onClick={() => handleJoin(subcategoryInfo.namakategori)}
            variant={"secondary"}
            className="w-full"
          >
            Bergabung
          </Button>
        )}
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mt-8">
        <h2 className="text-[#1ab35f] text-[28px] font-bold mb-6">Pekerja</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {workers.map((worker) => (
            <Dialog key={worker.id}>
              <DialogTrigger asChild>
                <div className="p-4 bg-[#e8f7ef] rounded-xl text-center hover:bg-[#d7f0e3] transition cursor-pointer border border-[#d9d9d9]">
                  <div className="w-[84px] h-[84px] bg-white rounded-xl border border-[#d9d9d9] mb-3 mx-auto overflow-hidden">
                    <Image
                      src={worker.linkfoto || "/default-profile.png"}
                      alt={`Foto ${worker.nama}`}
                      width={84}
                      height={84}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-black text-xl font-medium">
                    {worker.nama}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[682px] p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-8">
                <DialogHeader>
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">
                    Profil Pekerja
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#f5f5f5] flex items-center justify-center mb-6">
                    <Image
                      src={worker.linkfoto || "/default-profile.png"}
                      alt={`Foto ${worker.nama}`}
                      className="w-full h-full object-cover"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="w-full flex justify-between items-start">
                    <div className="flex flex-col gap-7 text-black text-xl font-bold">
                      <p>Nama</p>
                      <p>Rating</p>
                      <p>Jumlah Pesanan Selesai</p>
                      <p>No HP</p>
                      <p>Tanggal Lahir</p>
                      <p>Alamat</p>
                    </div>
                    <div className="flex flex-col gap-7 text-black text-xl font-normal">
                      <p>{worker.nama}</p>
                      <p>{worker.rating} / 5</p>
                      <p>{worker.jumlahpesananaselesai}</p>
                      <p>{worker.nohp}</p>
                      <p>
                        {new Date(worker.tgllahir).toLocaleDateString("id-ID")}
                      </p>
                      <p>{worker.alamat}</p>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button className="w-full px-5 py-3 bg-[#1ab35f] text-white text-2xl rounded-xl">
                    Tutup
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SubKategoriJasaPekerja;
