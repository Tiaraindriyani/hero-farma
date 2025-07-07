"use client";

import AdminLayout from "../AdminLayout";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function HistoryPage() {
  const [histories, setHistories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchHistories = async () => {
      const historyRef = collection(db, "history");
      const historySnapshot = await getDocs(historyRef);

      const historyData = historySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHistories(historyData);
      setLoading(false);
    };

    fetchHistories();
  }, []);

  // Filter histories based on the search input
  const filteredHistories = histories.filter((history) =>
    history.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-slate-100 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto md:ml-[300px]">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-black text-3xl font-bold">
              Riwayat Semua Pasien
            </h1>
            <p className="text-gray-400 text-xl">Apotek Hero Farma</p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cari berdasarkan nama pasien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Nama</th>
                  <th className="py-3 px-6 text-left">Usia</th>
                  <th className="py-3 px-6 text-left">Keluhan</th>
                  <th className="py-3 px-6 text-left">Riwayat</th>
                  <th className="py-3 px-6 text-left">Durasi</th>
                  <th className="py-3 px-6 text-left">Rekomendasi</th>
                  <th className="py-3 px-6 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistories.map((history) => (
                  <tr key={history.id} className="border-t hover:bg-gray-100">
                    <td className="py-3 px-6">{history.nama}</td>
                    <td className="py-3 px-6">{history.usia}</td>
                    <td className="py-3 px-6">{history.indikasi}</td>
                    <td className="py-3 px-6">{history.riwayatPenyakit}</td>
                    <td className="py-3 px-6">{history.durasi}</td>
                    <td className="py-3 px-6">
                       {history.rekomendasiObat?.map((obat: any, index: number) => (
              <p  key={index}>
                {obat.namaObat}
              </p>
               ))}
                    </td>

                    <td className="py-3 px-6">
                      {new Date(history.dateCreated).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
