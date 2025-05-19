"use client";

import { app } from "@/lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
}

export default function ObatDetailPage() {
  const [obat, setObat] = useState<Obat | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    if (!id) return;

    const fetchObatDetail = async () => {
      const obatDoc = await getDoc(doc(db, "obat", id as string));
      if (obatDoc.exists()) {
        setObat({ id: obatDoc.id, ...obatDoc.data() } as Obat);
      }
    };

    fetchObatDetail();
  }, [id]);

  if (!obat) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-600">
        Memuat data obat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-6 py-20 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 text-blue-700 drop-shadow-md">
          {obat.namaObat}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white p-6 rounded-2xl shadow-xl">
          <div className="w-full">
            <img
              src={obat.imageUrl}
              alt={obat.namaObat}
              className="w-full h-80 object-cover rounded-xl border border-gray-200 shadow"
            />
          </div>

          <div className="space-y-5">
            <div>
              <span className="block text-sm font-medium text-gray-500">
                Kategori
              </span>
              <p className="text-lg font-semibold text-blue-600">
                {obat.kategoriObat}
              </p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500">
                Deskripsi
              </span>
              <p className="text-gray-700 leading-relaxed">{obat.deskripsiObat}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500">
                Indikasi
              </span>
              <p className="text-gray-700">{obat.indikasiObat}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500">
                Efek Samping
              </span>
              <p className="text-gray-700">{obat.efekSamping}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500">
                Bentuk Obat
              </span>
              <p className="text-gray-700">{obat.bentukObat}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500">
                Harga
              </span>
              <p className="text-xl font-bold text-green-700">
                Rp {obat.harga},00
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
          >
            ← Kembali ke Produk
          </button>
        </div>
      </div>
    </div>
  );
}
