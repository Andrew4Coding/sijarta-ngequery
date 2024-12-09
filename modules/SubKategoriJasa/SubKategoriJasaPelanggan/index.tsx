"use client";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserData } from "@/hooks/useUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { dateConverter } from "../../EditProfileModule";
import { Testimonial } from "../type";

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

interface Discount {
  kode: string;
  potongan: number;
  mintrpemesanan: number;
}

const BeliJasaSchema = z.object({
  date: z.string(),
  discountCode: z.string().optional(),
  total: z.string(),
  paymentMethod: z.string(),
});

export default function SubKategoriJasaPelanggan({
  subCategory,
}: {
  subCategory: string;
}) {
  const [newOrder, setNewOrder] = useState({
    date: new Date().toLocaleDateString(),
    discountCode: "",
    total: 0,
    paymentMethod: "",
    status: "Menunggu Pembayaran",
  });

  const form = useForm<z.infer<typeof BeliJasaSchema>>({
    resolver: zodResolver(BeliJasaSchema),
    values: {
      date: new Date().toLocaleDateString(),
      discountCode: newOrder.discountCode,
      total: newOrder.total.toString(),
      paymentMethod: newOrder.paymentMethod,
    },
  });

  const router = useRouter();

  const [subcategoryInfo, setSubcategoryInfo] = useState<{
    namasubkategori: string;
    deskripsi: string;
    namakategori: string;
    subkategoriid?: string;
  } | null>(null);
  const [sessions, setSessions] = useState<{ sesi: number; harga: number }[]>(
    []
  );
  const [paymentMethods, setPaymentMethods] = useState<
    { id: string; nama: string }[]
  >([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const [selectedSession, setSelectedSession] = useState<{
    sesi: number;
    harga: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const { userData } = useUserData();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = async (subCategorieId: string) => {
    try {
      const response = await fetch(
        `/api/testimoni/getTestimoni?subKategoriId=${subCategorieId}`
      ); // Sesuaikan endpoint
      if (!response.ok) throw new Error("Failed to fetch testimonials");

      const result = await response.json();
      setTestimonials(result.data); // Asumsikan `data` berisi array testimoni
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Gagal memuat testimoni.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchWorkers = async (subkategoriId: string) => {
      try {
        const workersResponse = await fetch(
          `/api/pekerja?subkategoriId=${subkategoriId}`
        );

        if (!workersResponse.ok) throw new Error("Failed to fetch workers");
        const workersResult = await workersResponse.json();
        setWorkers(workersResult.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
        toast.error("Gagal memuat daftar pekerja.");
      }
    };

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
          await fetchTestimonials(result.data.subcategory.subkategoriid);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Error fetching subcategory data:",
          JSON.stringify(error, null, 2)
        );
        toast.error("Gagal memuat subkategori.");
      }
    };

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

    const fetchDiscounts = async () => {
      try {
        const response = await fetch(`/api/diskon?id=${userData.id}`);

        if (!response.ok) throw new Error("Failed to fetch discounts");

        const result = await response.json();

        console.log(result.data);

        setDiscounts(result.data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
        toast.error("Gagal memuat diskon.");
      }
    };

    fetchSubcategoryData();
    fetchPaymentMethods();

    if (userData.id) {
      fetchDiscounts();
    }
  }, [userData.id]);

  const handlePesanClick = (session: { sesi: number; harga: number }) => {
    setSelectedSession(session);
    setNewOrder((prevOrder) => ({ ...prevOrder, total: session.harga }));
  };

  const validateDiscountCode = (discountCode: string) => {
    if (!selectedSession) {
      toast.error("Pilih sesi layanan terlebih dahulu.");
      return;
    }

    const selectedDiscount = discounts.find(
      (discount) => discount.kode === discountCode
    );

    if (!selectedDiscount) {
      toast.error("Kode diskon tidak valid.");
      setNewOrder((prev) => ({ ...prev, total: selectedSession.harga }));
      return;
    }

    const { potongan: Potongan, mintrpemesanan: MinTrPemesanan } =
      selectedDiscount;

    if (selectedSession.harga < MinTrPemesanan) {
      toast.error(
        `Total harga harus minimal Rp ${MinTrPemesanan.toLocaleString("id-ID")}`
      );
      return;
    }

    const discountValue = selectedSession.harga * (Potongan / 100);
    const totalPrice = Math.max(0, selectedSession.harga - discountValue);

    setNewOrder((prev) => ({
      ...prev,
      discountCode,
      total: totalPrice,
    }));

    toast.success(`Kode diskon berhasil diterapkan! Diskon: ${Potongan}%`);
  };

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const { date, discountCode, total, paymentMethod } = form.getValues();

    if (!paymentMethod) {
      toast.error("Pilih metode pembayaran.");
      return;
    }

    try {
      const response = await fetch("/api/pemesanan-jasa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          tglPemesanan: date,
          totalBiaya: Number(total),
          idPelanggan: userData.id,
          idDiskon: discountCode,
          idMetodeBayar: paymentMethod,
          sesi: selectedSession?.sesi,
          idSubKategori: subcategoryInfo?.subkategoriid,
        }),
      });

      const result = await response.json();

      if (result.success === false) {
        toast.error(result.message);
        return;
      }
      
      toast.success("Pesanan berhasil diproses!");

      setTimeout(() => {
        router.push("/pemesanan-jasa");
      }, 2000);
    } catch (error) {
      toast.error("Gagal membuat pesanan.");
    }

    setIsLoading(false);
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
        <p className="text-black text-base font-medium mt-5">
          {subcategoryInfo.deskripsi}
        </p>
      </div>

      {/* Pilihan Sesi Layanan */}
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => handlePesanClick(session)}
                  className="px-5 py-3 bg-white text-black rounded-xl border border-[#d9d9d9]"
                >
                  Pesan
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[682px] h-auto p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-7 max-w-[80%]">
                <DialogHeader className="w-full flex flex-col items-center">
                  <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">
                    Pesan Jasa
                  </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full mt-5 flex flex-col gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Pemesanan</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              label="date"
                              className="w-full"
                              placeholder="Tanggal Pemesanan"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diskon</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(val) => {
                                field.onChange(val);
                                validateDiscountCode(val);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Kode Diskon ..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Kode Diskon</SelectLabel>
                                  {discounts.filter(
                                    (discount) =>
                                      discount.mintrpemesanan <=
                                      session.harga / 1000
                                  ).length > 0 ? (
                                    discounts
                                      .filter(
                                        (discount) =>
                                          discount.mintrpemesanan <=
                                          session.harga / 1000
                                      )
                                      .map((discount) => (
                                        <SelectItem
                                          key={discount.kode}
                                          value={discount.kode}
                                        >
                                          {discount.kode}
                                        </SelectItem>
                                      ))
                                  ) : (
                                    <SelectItem disabled value="empty">
                                      Tidak ada diskon yang tersedia untuk sesi
                                      ini
                                    </SelectItem>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="total"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Pembayaran</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              defaultValue={session?.harga ?? 0}
                              label="total"
                              className="w-full"
                              placeholder="Total Pembayaran"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Metode Pembayaran</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(val) => {
                                field.onChange(val);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Metode Pembayaran ..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Metode Pembayaran</SelectLabel>
                                  {paymentMethods.map((method) => (
                                    <SelectItem
                                      key={method.id}
                                      value={method.id}
                                    >
                                      {method.nama}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full"
                      variant={"secondary"}
                      type="submit"
                      onClick={() => {
                        console.log(form.getValues());
                      }}
                    >
                      Pesan Jasa
                    </Button>
                  </form>
                </Form>
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
                  <p className="text-black text-xl font-medium">
                    {worker.nama}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[682px] p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-8">
                <DialogHeader className="w-full text-center">
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
                      <p>{dateConverter(new Date(worker.tgllahir))}</p>
                      <p>{worker.alamat}</p>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button variant={"secondary"}
                    disabled={isLoading}
                  >Tutup</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
      {/* Bagian Testimoni */}
      <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mt-10">
        <h2 className="text-[#1ab35f] text-[28px] font-bold">Testimoni</h2>
        {testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-b border-[#d9d9d9] pb-4 mb-4 last:border-none last:mb-0"
            >
              <div className="flex items-center mb-2">
                <p className="text-black text-lg font-semibold">
                  {testimonial.customerName}
                </p>
                <span className="text-[#1ab35f] text-sm ml-2">
                  {testimonial.rating.toFixed(1)} ⭐
                </span>
              </div>
              <p className="text-black text-sm mb-2">"{testimonial.review}"</p>
              <p className="text-gray-500 text-xs">
                Dipekerjakan oleh {testimonial.workerName} pada{" "}
                {new Date(testimonial.date).toLocaleDateString("id-ID")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            Belum ada testimoni untuk kategori ini.
          </p>
        )}
      </div>
    </main>
  );
}
