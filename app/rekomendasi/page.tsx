"use client";

import { obatsCollection, historysCollection } from "@/lib/firebase";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-hot-toast";

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
      toast.error("indikasi wajib diisi!");
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

      await addDoc(historysCollection, {
        ...input,
        dateCreated: new Date().toISOString(),
      });

      toast.success("Riwayat pencarian berhasil disimpan!");

      const filtered = data.filter((obat: Rekomendasi) => obat.similarity > 0);
      setRekomendasi(filtered);
    } catch (error) {
      console.error("Gagal mengambil rekomendasi:", error);
      toast.error("Terjadi kesalahan saat memproses data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white min-h-screen p-8 py-32">
      <h1 className="text-4xl font-semibold text-center mb-6">
        Sistem Rekomendasi Obat
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "nama",
              label: "Nama",
              type: "text",
              placeholder: "Masukkan nama",
            },
            {
              name: "usia",
              label: "Usia",
              type: "number",
              placeholder: "Masukkan usia",
            },
            {
              name: "indikasi",
              label: "Indikasi",
              type: "text",
              placeholder: "Contoh: demam, batuk",
            },
            {
              name: "durasi",
              label: "Durasi indikasi",
              type: "text",
              placeholder: "Contoh: 2 hari",
            },
            {
              name: "riwayatPenyakit",
              label: "Riwayat Penyakit",
              type: "text",
              placeholder: "Contoh: asma, maag",
            },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-lg font-medium mb-2 text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={(input as any)[field.name]}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                required={
                  field.name === "nama" ||
                  field.name === "usia" ||
                  field.name === "indikasi"
                }
              />
            </div>
          ))}
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

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Rekomendasi Obat:
        </h2>
        {rekomendasi.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada obat yang sesuai dengan pencarian Anda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rekomendasi.map((obat) => (
              <div
                key={obat.id}
                className="border border-gray-200 rounded-lg shadow-lg p-6  bg-white transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {obat.namaObat}
                </h3>
                <img
                  src={obat.imageUrl}
                  alt={obat.namaObat}
                  className="w-full h-40 object-contain mb-4 rounded-md"
                />
                <p className="text-gray-600 mb-2">
                  <strong>Kategori:</strong> {obat.kategoriObat}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Indikasi:</strong> {obat.indikasiObat}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Efek Samping:</strong> {obat.efekSamping}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Bentuk:</strong> {obat.bentukObat}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Harga:</strong> {obat.harga}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Similarity: {(obat.similarity * 100).toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
