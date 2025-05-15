"use client";
import { obatsCollection } from "@/lib/firebase";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../app/api/upload";

type ObatFormProps = {
  existingData?: {
    namaObat: string;
    id: string;
    kategoriObat: string;
    imageUrl: string;
    indikasiObat: string;
    efekSamping: string;
    bentukObat: string;
    harga: string;
    deskripsiObat: string;
  };
  onClose: () => void;
};

export default function ObatForm({ existingData, onClose }: ObatFormProps) {
  const [namaObat, setNamaObat] = useState(existingData?.namaObat || "");
  const [kategoriObat, setKategoriObat] = useState(
    existingData?.kategoriObat || ""
  );
  const [indikasiObat, setIndikasiObat] = useState(
    existingData?.indikasiObat || ""
  );
  const [efekSamping, setEfekSamping] = useState(
    existingData?.efekSamping || ""
  );
  const [bentukObat, setBentukObat] = useState(existingData?.bentukObat || "");
  const [harga, setHarga] = useState(existingData?.harga || "");
  const [deskripsiObat, setDeskripsiObat] = useState(
    existingData?.deskripsiObat || ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = existingData?.imageUrl || "";

      if (image) {
        const uploadedImageUrl = await uploadToCloudinary(image);
        if (!uploadedImageUrl) throw new Error("Gagal mengunggah gambar.");
        imageUrl = uploadedImageUrl;
      }

      const timestamp = new Date().toISOString();

      if (existingData) {
        await updateDoc(doc(obatsCollection, existingData.id), {
          namaObat,
          kategoriObat,
          indikasiObat,
          efekSamping,
          bentukObat,
          harga,
          deskripsiObat,
          updatedAt: timestamp,
          ...(image && { imageUrl }),
        });
        toast.success("Data berhasil diperbarui!");
      } else {
        await addDoc(obatsCollection, {
          namaObat,
          kategoriObat,
          indikasiObat,
          efekSamping,
          bentukObat,
          harga,
          imageUrl,
          deskripsiObat,
          dateCreated: timestamp,
        });
        toast.success("Data berhasil ditambahkan!");
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full my-8 mx-auto"
    >
      <h1 className="text-2xl font-semibold text-center mb-6">Form Obat</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Obat</label>
          <input
            type="text"
            placeholder="Nama Obat"
            value={namaObat}
            onChange={(e) => setNamaObat(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <input
            type="text"
            value={kategoriObat}
            placeholder="Kategori"
            onChange={(e) => setKategoriObat(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Indikasi Obat
          </label>
          <input
            type="text"
            placeholder="Indikasi Obat"
            value={indikasiObat}
            onChange={(e) => setIndikasiObat(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Efek Samping</label>
          <input
            type="text"
            placeholder="Efek Samping"
            value={efekSamping}
            onChange={(e) => setEfekSamping(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bentuk Obat</label>
          <input
            type="text"
            placeholder="Bentuk Obat"
            value={bentukObat}
            onChange={(e) => setBentukObat(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Deskripsi Obat
          </label>
          <input
            type="text"
            placeholder="Deskripsi Obat"
            value={deskripsiObat}
            onChange={(e) => setDeskripsiObat(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <input
            type="text"
            placeholder="Harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Gambar
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Loading..." : existingData ? "Update" : "Tambah"}
        </button>
      </div>
    </form>
  );
}
