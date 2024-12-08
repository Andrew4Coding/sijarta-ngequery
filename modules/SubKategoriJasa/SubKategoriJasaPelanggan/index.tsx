'use client';

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  } | null>(null);
  const [sessions, setSessions] = useState<{ sesi: number; harga: number }[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<{ id: string; nama: string }[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [testimonials] = useState<Testimonial[]>([]);
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

            // Gunakan ID subkategori untuk pekerja
            if (result.data.subcategory.subkategoriid) {
                fetchWorkers(result.data.subcategory.subkategoriid);
            }
        } catch (error) {
            console.error("Error fetching subcategory data:", error);
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

  async function fetchWorkersAndTestimonials(subkategoriId: string) {
    try {
        const response = await fetch(`/api/pekerja?subkategoriId=${subkategoriId}`);
        if (!response.ok) {
            throw new Error(`Error response from /api/pekerja: ${await response.text()}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching pekerja data:", error instanceof Error ? error.message : error);
        throw error;
    }
  }  

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
  
        if (!response.ok) throw new Error(result.message || "Kode diskon tidak valid");
  
        const { potongan, minTrPemesanan } = result.data;
  
        if (selectedSession.harga < minTrPemesanan) {
          toast.error(`Minimal transaksi Rp ${minTrPemesanan.toLocaleString("id-ID")} untuk diskon.`);
          setNewOrder((prev) => ({ ...prev, total: selectedSession.harga }));
          return;
        }
  
        const discountValue = selectedSession.harga * (potongan / 100);
        const totalPrice = Math.max(0, selectedSession.harga - discountValue);
  
        setNewOrder((prev) => ({ ...prev, total: totalPrice }));
        toast.success("Kode diskon berhasil diterapkan!");
      } catch (error: any) {
        console.error("Error validating discount code:", error);
        toast.error(error.message || "Kode diskon tidak valid.");
        setNewOrder((prev) => ({ ...prev, total: selectedSession.harga }));
      }
    },
    [selectedSession]
  );  

  const handleDiscountChangeOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      validateDiscountCode(newOrder.discountCode);
    }
  };  

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

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("/api/pekerja");
        if (!response.ok) throw new Error("Failed to fetch workers");
        const data = await response.json();
        setWorkers(data.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

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
        <p className="text-black text-base font-medium mt-5">{subcategoryInfo.deskripsi}</p>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Pilihan Sesi Layanan</h2>
        {sessions.map((session, index) => (
          <div key={index} className="flex justify-between items-center bg-[#e8f7ef] rounded-xl p-5 mb-4">
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
              <DialogContent className="w-[682px] h-[720px] p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col justify-start items-start gap-7">
                <DialogHeader className="w-full flex flex-col items-center">
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">
                    Pesan Jasa
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Tanggal Pemesanan:</label>
                  <div className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] flex items-center">
                    <span className="text-[#b2b2b2] text-xl font-medium">{newOrder.date}</span>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Diskon:</label>
                  <input
                    type="text"
                    placeholder="Kode Diskon"
                    value={newOrder.discountCode}
                    onChange={(e) => setNewOrder((prev) => ({ ...prev, discountCode: e.target.value }))}
                    onKeyDown={handleDiscountChangeOnEnter}
                    className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] bg-transparent text-black text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#d9d9d9] placeholder:text-[#b2b2b2]"
                  />
                </div>
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Total Pembayaran:</label>
                  <div className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] flex items-center">
                    <span className="text-[#b2b2b2] text-xl font-medium">
                      Rp {newOrder.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
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
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Pekerja</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {workers.map((worker) => (
            <Dialog key={worker.id}>
              <DialogTrigger asChild>
                <div className="p-4 bg-[#e8f7ef] rounded-xl text-center hover:bg-[#d7f0e3] transition cursor-pointer border border-[#d9d9d9]">
                  <div className="w-[84px] h-[84px] bg-white rounded-xl border border-[#d9d9d9] mb-3 mx-auto overflow-hidden">
                    <Image
                      src={worker.linkfoto}
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
                      <p>{worker.tgllahir}</p>
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


      {/* Testimonials Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mt-8">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Testimoni</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-[#e8f7ef] rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-black text-xl font-bold">{testimonial.customerName}</p>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white rounded-full border border-[#d9d9d9]">{testimonial.workerName}</div>
                <div className="px-4 py-2 bg-white rounded-full border border-[#d9d9d9]">{testimonial.rating}/5</div>
              </div>
            </div>
            <p className="text-black text-base font-medium">{testimonial.review}</p>
            <p className="text-[#1ab35f] text-sm">{testimonial.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}