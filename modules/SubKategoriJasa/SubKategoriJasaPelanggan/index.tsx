'use client';

import { useEffect, useState } from "react";
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

export default function SubKategoriJasaPelanggan({ subCategory }: { subCategory: string }) {
  const [subcategoryInfo, setSubcategoryInfo] = useState<{
    namasubkategori: string;
    deskripsi: string;
    namakategori: string;
  } | null>(null);
  const [sessions, setSessions] = useState<{ sesi: number; harga: number }[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState({
    date: new Date().toLocaleDateString(),
    discountCode: "",
    total: 0,
    paymentMethod: "",
    status: "Menunggu Pembayaran",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      const formattedSubCategory = subCategory.replace(/-/g, " ");
      try {
        const response = await fetch(`/api/subkategori?name=${encodeURIComponent(formattedSubCategory)}`);
        const result = await response.json();

        if (response.ok) {
          setSubcategoryInfo(result.data.subcategory);
          setSessions(result.data.sessions);

          // Simulasi data pekerja dan testimoni
          setWorkers([
            {
              name: "Budi",
              image: "/worker1.jpg",
              rating: 4.5,
              completedOrders: 120,
              phone: "08123456789",
              birthDate: "1995-02-20",
              address: "Jakarta",
            },
            {
              name: "Siti",
              image: "/worker2.jpg",
              rating: 4.8,
              completedOrders: 150,
              phone: "08123456788",
              birthDate: "1992-06-15",
              address: "Surabaya",
            },
          ]);
          setTestimonials([
            { customerName: "Ali", workerName: "Budi", rating: 5, review: "Pekerjaan sangat rapi!", date: "2023-12-01" },
            { customerName: "Aisyah", workerName: "Siti", rating: 4.7, review: "Pekerjaannya cepat dan memuaskan.", date: "2023-12-05" },
          ]);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to fetch subcategory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [subCategory]);

  const handlePesanClick = (session: { sesi: number; harga: number }) => {
    setNewOrder({
      ...newOrder,
      total: session.harga,
    });
  };

  const handleDiscountChange = (discountCode: string, session: { sesi: number; harga: number }) => {
    let discountValue = 0;

    if (!session) return;

    const sessionPrice = session.harga;

    // Validasi diskon
    if (discountCode === "PROMO10") {
      discountValue = sessionPrice * 0.1; // Diskon 10%
    } else if (discountCode === "PROMO20") {
      discountValue = sessionPrice * 0.2; // Diskon 20%
    } else {
      discountValue = 0; // Diskon tidak valid
    }

    const totalPrice = sessionPrice - discountValue;

    setNewOrder((prevOrder) => ({
      ...prevOrder,
      discountCode,
      total: totalPrice > 0 ? totalPrice : 0,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!subcategoryInfo) {
    return <p>Subcategory not found</p>;
  }

  return (
    <main className="bg-[#f8f8f8] min-h-screen pt-[132px] pb-[32px] px-6">
      {/* Header Section */}
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

      {/* Service Session Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Pilihan Sesi Layanan</h2>
        {sessions.map((session, index) => (
          <div key={index} className="flex justify-between items-center bg-[#e8f7ef] rounded-xl p-5 mb-4">
            <div>
              <h3 className="text-black text-xl font-bold">{`Sesi ${session.sesi}`}</h3>
              <p className="text-black text-xl font-medium">{`Rp ${session.harga.toLocaleString("id-ID")}`}</p>
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
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">Pesan Jasa</DialogTitle>
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
                    onChange={(e) => handleDiscountChange(e.target.value, session)}
                    className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] bg-transparent text-black text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#d9d9d9] placeholder:text-[#b2b2b2]"
                    />

                </div>
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Total Pembayaran:</label>
                  <div className="w-full px-4 py-5 rounded-xl border border-[#d9d9d9] flex items-center">
                    <span className="text-[#b2b2b2] text-xl font-medium">{`Rp ${newOrder.total.toLocaleString("id-ID")}`}</span>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <label className="text-black text-xl font-medium">Metode Pembayaran:</label>
                  <Select onValueChange={(value) => setNewOrder({ ...newOrder, paymentMethod: value })}>
                    <SelectTrigger className="w-full px-4 py-8 rounded-xl border border-[#d9d9d9] flex justify-between items-center">
                      <SelectValue placeholder="Pilih Metode" className="text-black text-xl font-medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Metode Pembayaran</SelectLabel>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="MyPay">MyPay</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full px-5 py-3 bg-[#1ab35f] text-white text-2xl rounded-xl"
                  onClick={() => alert("Pesanan berhasil!")}
                >
                  Pesan Jasa
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>

      {/* Workers Section */}
      <div className="max-w-3xl mx-auto bg-white border border-[#d9d9d9] rounded-[20px] p-7 mt-8">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Pekerja</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {workers.map((worker, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="p-4 bg-[#e8f7ef] rounded-xl text-center hover:bg-[#d7f0e3] transition cursor-pointer border border-[#d9d9d9]">
                  <div className="w-[84px] h-[84px] bg-white rounded-xl border border-[#d9d9d9] mb-3 mx-auto overflow-hidden">
                    <Image
                      src={worker.image}
                      alt={`Foto ${worker.name}`}
                      width={84}
                      height={84}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-black text-xl font-medium">{worker.name}</p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[682px] p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-8">
                <DialogHeader className="w-full text-center">
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">Profil Pekerja</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#f5f5f5] flex items-center justify-center mb-6">
                    <Image
                      src={worker.image}
                      alt={`Foto ${worker.name}`}
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
                      <p>{worker.name}</p>
                      <p>{worker.rating}/5</p>
                      <p>{worker.completedOrders}</p>
                      <p>{worker.phone}</p>
                      <p>{worker.birthDate}</p>
                      <p>{worker.address}</p>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button className="w-full px-5 py-3 bg-[#1ab35f] text-white text-2xl rounded-xl">Tutup</Button>
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
