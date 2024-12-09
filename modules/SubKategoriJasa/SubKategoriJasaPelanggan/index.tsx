'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { dateConverter } from "../../EditProfileModule";

interface Worker {
  id: string;
  nama: string;
  nohp: string;
  tgllahir: string;
  alamat: string;
  rating: number;
  jumlahpesananaselesai: number;
  linkfoto: string;
}

interface Testimonial {
  customerName: string;
  workerName: string;
  rating: number;
  review: string;
  date: string;
}

export default function SubKategoriJasaPelanggan({ subCategory }: { subCategory: string }) {
  const router = useRouter();
  const [subcategoryInfo, setSubcategoryInfo] = useState<{
    namasubkategori: string;
    deskripsi: string;
    namakategori: string;
    subkategoriid?: string;
  } | null>(null);
  const [sessions, setSessions] = useState<{ sesi: number; harga: number }[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<{ id: string; nama: string }[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [newOrder, setNewOrder] = useState({
    date: new Date().toLocaleDateString(),
    discountCode: "",
    total: 0,
    paymentMethod: "",
    status: "Menunggu Pembayaran",
  });
  const [selectedSession, setSelectedSession] = useState<{ sesi: number; harga: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        const formattedSubCategory = subCategory.replace(/-/g, " ");
        const response = await fetch(`/api/subkategori?name=${encodeURIComponent(formattedSubCategory)}`);
        if (!response.ok) throw new Error("Failed to fetch subcategory data");

        const result = await response.json();
        setSubcategoryInfo(result.data.subcategory);
        setSessions(result.data.sessions);

        if (result.data.subcategory.subkategoriid) {
          await fetchWorkers(result.data.subcategory.subkategoriid);
        }
      } catch (error) {
        console.error("Error fetching subcategory data:", JSON.stringify(error, null, 2));
        toast.error("Gagal memuat subkategori.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [subCategory]);

  const fetchWorkers = async (subkategoriId: string) => {
    try {
      const workersResponse = await fetch(`/api/pekerja?subkategoriId=${subkategoriId}`);

      if (!workersResponse.ok) throw new Error("Failed to fetch workers");
      const workersResult = await workersResponse.json();
      setWorkers(workersResult.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
      toast.error("Gagal memuat daftar pekerja.");
    }
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch("/api/metodeBayar");
        if (!response.ok) throw new Error("Failed to fetch payment methods");

        const result = await response.json();
        setPaymentMethods(result.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        toast.error("Gagal memuat metode pembayaran.");
      }
    };

    fetchPaymentMethods();
  }, []);

  const handlePesanClick = (session: { sesi: number; harga: number }) => {
    setSelectedSession(session);
    setNewOrder((prevOrder) => ({ ...prevOrder, total: session.harga }));
  };

  const validateDiscountCode = useCallback(
    async (discountCode: string) => {
      if (!selectedSession) {
        toast.error("Pilih sesi layanan terlebih dahulu.");
        return;
      }
  
      try {
        const response = await fetch(`/api/diskon/validate?code=${encodeURIComponent(discountCode)}`);
        const result = await response.json();
  
        // Jika status bukan 200, tampilkan error dari server
        if (!response.ok) {
          throw new Error(result.message || "Kode diskon tidak valid.");
        }
  
        const { Potongan, MinTrPemesanan } = result.data;
  
        if (!Potongan || !MinTrPemesanan) {
          toast.error("Data diskon tidak lengkap. Hubungi administrator.");
          return;
        }
  
        if (selectedSession.harga < MinTrPemesanan) {
          toast.error(`Total harga harus minimal Rp ${MinTrPemesanan.toLocaleString("id-ID")}`);
          return;
        }
  
        const discountValue = selectedSession.harga * (Potongan / 100);
        const totalPrice = Math.max(0, selectedSession.harga - discountValue);
  
        setNewOrder((prev) => ({
          ...prev,
          total: totalPrice,
        }));
  
        toast.success(`Kode diskon berhasil diterapkan! Diskon: ${Potongan}%`);
      } catch (error: any) {
        console.error("Error validating discount code:", error.message);
        toast.error(error.message || "Kode diskon tidak valid.");
        setNewOrder((prev) => ({ ...prev, total: selectedSession.harga }));
      }
    },
    [selectedSession]
  );  

  const handleSubmitOrder = () => {
    if (!selectedSession) {
      toast.error("Pilih sesi layanan terlebih dahulu.");
      return;
    }

    if (!newOrder.paymentMethod) {
      toast.error("Pilih metode pembayaran terlebih dahulu.");
      return;
    }

    toast.success("Pesanan berhasil diproses!");
    router.push("/pemesanan-jasa");
  };

  if (loading) return <p>Loading...</p>;
  if (!subcategoryInfo) return <p>Subcategory not found</p>;

  return (
    <main className="bg-[#f8f8f8] min-h-screen pt-[132px] pb-[32px] px-6">
      {/* Subcategory Information */}
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mb-10">
        <div className="flex">
          <div className="flex-1 h-[46px] bg-[#1ab35f] text-center text-white text-xl font-bold rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center">
            {subcategoryInfo.namakategori}
          </div>
          <div className="flex-1 h-[46px] text-center text-[#1ab35f] text-xl font-bold rounded-tr-[20px] rounded-br-[20px] border border-[#d9d9d9] flex items-center justify-center">
            {subcategoryInfo.namasubkategori}
          </div>
        </div>
        <p className="text-black text-base font-medium mt-5">{subcategoryInfo.deskripsi}</p>
      </div>

      {/* Pilihan Sesi Layanan */}
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Pilihan Sesi Layanan</h2>
        {sessions.map((session, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[#e8f7ef] rounded-xl p-5 mb-4"
          >
            <div>
              <h3 className="text-black text-xl font-bold">Sesi {session.sesi}</h3>
              <p className="text-black text-xl font-medium">
                Rp {session.harga.toLocaleString("id-ID")}
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => handlePesanClick(session)}
                  className="px-5 py-3 bg-white text-black rounded-xl border border-[#d9d9d9]"
                >
                  Pesan
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[682px] h-auto p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-7">
                <DialogHeader className="w-full flex flex-col items-center">
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">
                    Pesan Jasa
                  </DialogTitle>
                </DialogHeader>

                {/* Tanggal Pemesanan */}
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Tanggal Pemesanan:</label>
                  <div className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] flex items-center">
                    <span className="text-[#b2b2b2] text-xl font-medium">{newOrder.date}</span>
                  </div>
                </div>

                {/* Kode Diskon */}
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Diskon:</label>
                  <input
                    type="text"
                    placeholder="Kode Diskon"
                    value={newOrder.discountCode}
                    onChange={(e) => setNewOrder((prev) => ({ ...prev, discountCode: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") validateDiscountCode(newOrder.discountCode);
                    }}
                    className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] bg-transparent text-black text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#d9d9d9] placeholder:text-[#b2b2b2]"
                  />
                </div>

                {/* Total Pembayaran */}
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Total Pembayaran:</label>
                  <div className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] flex items-center">
                  <span className="text-[#b2b2b2] text-xl font-medium">
                    Rp {(newOrder.total || 0).toLocaleString("id-ID")}
                  </span>

                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Metode Pembayaran:</label>
                  <Select onValueChange={(value) => setNewOrder({ ...newOrder, paymentMethod: value })}>
                    <SelectTrigger className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] flex justify-between items-center">
                      <SelectValue placeholder="Pilih Metode" className="text-black text-xl font-medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Metode Pembayaran</SelectLabel>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.nama}>
                            {method.nama}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Button Pesan */}
                <Button
                  className="w-full px-5 py-3 bg-[#1ab35f] text-white text-2xl rounded-xl"
                  onClick={handleSubmitOrder}
                >
                  Pesan Jasa
                </Button>
              </DialogContent>
            </Dialog>

          </div>
        ))}
      </div>

      {/* Workers Section */}
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
                  <p className="text-black text-xl font-medium">{worker.nama}</p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[682px] p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-8">
                <DialogHeader className="w-full text-center">
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">Profil Pekerja</DialogTitle>
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
                      <p>{dateConverter(new Date(worker.tgllahir))}</p>
                      <p>{worker.alamat}</p>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button
                    variant={'secondary'}
                  >
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
}