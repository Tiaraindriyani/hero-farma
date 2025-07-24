"use client";

import { obatsCollection } from "@/lib/firebase";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ObatForm from "./formInput";

interface Obat {
  id: string;
  namaObat: string;
  kategoriObat: string;
  imageUrl: string;
  indikasiObat: string;
  efekSamping: string;
  bentukObat: string;
  harga: string;
  deskripsiObat: string;
  usia?: string; // ✅ Tambahkan usia ke interface
}

export default function EventTable() {
  const [obats, setObats] = useState<Obat[]>([]);
  const [selectedObat, setSelectedObat] = useState<Obat | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(obatsCollection);
      setObats(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Obat)));
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(obatsCollection, id));
      setObats(obats.filter((obat) => obat.id !== id));
      toast.success("Data berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus data!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 h-screen md:ml-[300px] ">
      <button
        onClick={() => {
          setSelectedObat(undefined);
          setIsOpen(true);
        }}
        className="mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#2c3e70] transition-all duration-200"
      >
        Tambah Obat
      </button>

      {isOpen && (
        <ObatForm
          existingData={selectedObat}
          onClose={() => {
            setIsOpen(false);
            location.reload();
          }}
        />
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4">Nama Obat</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Keluhan</th>
              <th className="p-4">Riwayat Penyakit</th>
              <th className="p-4">Bentuk</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Usia</th> 
              <th className="p-4">Gambar</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {obats.map((obat) => (
              <tr key={obat.id} className="hover:bg-gray-100 border-t">
                <td className="p-4 text-center">{obat.namaObat}</td>
                <td className="p-4 text-center">{obat.kategoriObat}</td>
                <td className="p-4 text-center">{obat.indikasiObat}</td>
                <td className="p-4 text-center">{obat.efekSamping}</td>
                <td className="p-4 text-center">{obat.bentukObat}</td>
                <td className="p-4 text-center">
                  {obat.deskripsiObat.substring(0, 20)}...
                </td>
                <td className="p-4 text-center">{obat.harga}</td>
                <td className="p-4 text-center">{obat.usia || "-"}</td> 
                <td className="p-4 text-center">
                  <img
                    src={obat.imageUrl}
                    alt={obat.namaObat}
                    className="h-12 mx-auto"
                  />
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedObat(obat);
                      setIsOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(obat.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
