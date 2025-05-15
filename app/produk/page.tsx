// app/produk/page.tsx
"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Produk() {
  const [obats, setObats] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredObats, setFilteredObats] = useState<any[]>([]);

  useEffect(() => {
    const fetchObats = async () => {
      const q = query(collection(db, "obat"));
      const querySnapshot = await getDocs(q);
      const obatList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setObats(obatList);
      setFilteredObats(obatList);
    };

    fetchObats();
  }, []);

  const handleSearch = () => {
    const filtered = obats.filter((obat) => {
      return (
        obat.namaObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obat.indikasiObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obat.kategoriObat.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredObats(filtered);
  };

  const formatPrice = (price: string) => {
    const number = parseInt(price, 10);
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10 drop-shadow-md">
        Daftar Produk Obat
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center bg-white shadow-lg rounded-full px-5 py-3 border border-blue-300">
          <input
            type="text"
            placeholder="Cari nama obat, kategori, atau indikasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-sm text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Cari"
          >
            <FaSearch size={18} />
          </button>
        </div>
      </div>

      {/* Produk List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredObats.length > 0 ? (
          filteredObats.map((obat) => (
            <Link key={obat.id} href={`/produk/${obat.id}`}>
              <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-gray-200">
                <img
                  src={obat.imageUrl}
                  alt={obat.namaObat}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-bold text-blue-600 truncate">
                  {obat.namaObat}
                </h3>
                <p className="text-sm text-gray-500 mt-1 italic">
                  {obat.kategoriObat}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {obat.indikasiObat}
                </p>
                <p className="font-semibold text-teal-600 mt-3 text-right">
                  {formatPrice(obat.harga)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Tidak ada produk yang ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
