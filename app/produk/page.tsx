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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">
        Produk Obat
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 flex items-center space-x-2 border-2 border-blue-500 rounded-full p-2">
        <input
          type="text"
          placeholder="Cari obat, kategori, atau indikasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 rounded-full outline-none"
        />
        <button onClick={handleSearch} className="text-blue-500">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Produk List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredObats.length > 0 ? (
          filteredObats.map((obat) => (
            <Link key={obat.id} href={`/produk/${obat.id}`}>
              <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                <img
                  src={obat.imageUrl}
                  alt={obat.namaObat}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-blue-500">
                  {obat.namaObat}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {obat.kategoriObat}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {obat.indikasiObat}
                </p>
                <p className="font-semibold text-teal-500 mt-3">
                  {formatPrice(obat.harga)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Tidak ada produk yang ditemukan
          </p>
        )}
      </div>
    </div>
  );
}
