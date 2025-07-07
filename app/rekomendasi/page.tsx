"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const historysCollection = collection(db, "history");

export default function RekomendasiObatPage() {
  const [input, setInput] = useState({
    nama: "",
    usia: "",
    indikasi: "",
    durasi: "",
    riwayatPenyakit: "",
  });

  type Rekomendasi = {
    similarity: number;
    id: string;
    namaObat: string;
    kategoriObat: string;
    indikasiObat: string;
    efekSamping: string;
    bentukObat: string;
    deskripsiObat: string;
    harga: string;
    imageUrl: string;
  };

  const [rekomendasi, setRekomendasi] = useState<Rekomendasi[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.indikasi.trim()) {
      toast.error("Indikasi wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/rekomendasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        toast.error(data?.error || "Gagal mengambil data.");
        return;
      }

      const filtered = data.filter((obat: Rekomendasi) => obat.similarity > 0);
      setRekomendasi(filtered);


      toast.success("Riwayat rekomendasi berhasil disimpan!");
    } catch (error) {
      console.error("Gagal mengambil rekomendasi:", error);
      toast.error("Terjadi kesalahan saat memproses data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white min-h-screen p-8 py-32">
      <h1 className="text-4xl font-semibold text-center mb-6">Sistem Rekomendasi Obat</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["nama", "usia", "indikasi", "durasi", "riwayatPenyakit"].map((name) => {
            const isRequired = ["nama", "usia", "indikasi"].includes(name);
            const placeholderMap: Record<string, string> = {
              nama: "Masukkan nama",
              usia: "Masukkan usia",
              indikasi: "Contoh: demam, batuk",
              durasi: "Contoh: 2 hari",
              riwayatPenyakit: "Contoh: asma, maag",
            };

            const labelMap: Record<string, string> = {
              nama: "Nama",
              usia: "Usia",
              indikasi: "Keluhan",
              durasi: "Durasi indikasi",
              riwayatPenyakit: "Riwayat Penyakit",
            };

            return (
              <div key={name} className="flex flex-col">
                <label className="text-lg font-medium mb-2 text-gray-700">{labelMap[name]}</label>
                <input
                  type={name === "usia" ? "number" : "text"}
                  name={name}
                  placeholder={placeholderMap[name]}
                  value={(input as any)[name]}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                  required={isRequired}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Memproses..." : "Cari Obat"}
          </button>
        </div>
      </form>

      {/* Hasil rekomendasi */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Rekomendasi Obat:
        </h2>
        {rekomendasi.length === 0 ? (
          <p className="text-center text-gray-200">
            Tidak ada obat yang sesuai dengan pencarian Anda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rekomendasi.map((obat) => (
              <div
                key={obat.id}
                className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{obat.namaObat}</h3>
                <img
                  src={obat.imageUrl}
                  alt={obat.namaObat}
                  className="w-full h-40 object-contain mb-4 rounded-md"
                />
                <p className="text-gray-600 mb-2"><strong>Kategori:</strong> {obat.kategoriObat}</p>
                <p className="text-gray-600 mb-2"><strong>Keluhan:</strong> {obat.indikasiObat}</p>
                <p className="text-gray-600 mb-2"><strong>Riwayat Penyakit:</strong> {obat.efekSamping}</p>
                <p className="text-gray-600 mb-2"><strong>Bentuk:</strong> {obat.bentukObat}</p>
                <p className="text-gray-600 mb-2"><strong>Harga:</strong> {obat.harga}</p>
                <p className="text-sm text-blue-600 mt-2">Similarity: {(obat.similarity * 100).toFixed(2)}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
