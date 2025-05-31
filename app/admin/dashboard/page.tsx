"use client";

import AdminLayout from "../AdminLayout";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getCountFromServer,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [obatsCount, setObatsCount] = useState(0);
  const [historysCount, setHistorysCount] = useState(0);
  const [recentHistories, setRecentHistories] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]); // ➕ State baru untuk pesan

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/auth/login");
      } else {
        setUser(currentUser);
        fetchDashboardData();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchDashboardData = async () => {
    const obatsRef = collection(db, "obat");
    const historysRef = collection(db, "history");
    const pesanRef = collection(db, "pesan"); // ➕ Koleksi pesan

    const obatsCountSnapshot = await getCountFromServer(obatsRef);
    const historysCountSnapshot = await getCountFromServer(historysRef);

    setObatsCount(obatsCountSnapshot.data().count);
    setHistorysCount(historysCountSnapshot.data().count);

    const recentHistoryQuery = query(
      historysRef,
      orderBy("dateCreated", "desc"),
      limit(5)
    );
    const recentHistorySnapshot = await getDocs(recentHistoryQuery);
    const historyData = recentHistorySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecentHistories(historyData);

    // ➕ Ambil 5 pesan terbaru
    const pesanQuery = query(pesanRef, orderBy("timestamp", "desc"), limit(5));
    const pesanSnapshot = await getDocs(pesanQuery);
    const pesanData = pesanSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecentMessages(pesanData);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  return (
    <AdminLayout>
      <div className="py-16 min-h-screen bg-slate-100 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto md:ml-[300px]">
          <div className="text-center lg:text-left">
            <h1 className="text-black text-3xl font-bold">
              Selamat Datang Admin {user.email}
            </h1>
            <p className="text-gray-400 text-xl">Apotek Hero Farma!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Obat
              </h2>
              <p className="text-3xl font-bold text-blue-600">{obatsCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">
                Total History
              </h2>
              <p className="text-3xl font-bold text-green-600">
                {historysCount}
              </p>
            </div>
          </div>

          {/* Histori */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              5 Histori Terbaru
            </h2>
            <div className="space-y-4">
              {recentHistories.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Nama:</strong> {item.nama}
                  </p>
                  <p>
                    <strong>Usia:</strong> {item.usia}
                  </p>
                  <p>
                    <strong>Keluhan:</strong> {item.indikasi}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {item.riwayatPenyakit}
                  </p>
                  <p>
                    <strong>Durasi:</strong> {item.durasi}
                  </p>
                  <p>
                    <strong>Riwayat Penyakit:</strong> {item.riwayatPenyakit}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Tanggal:</strong>{" "}
                    {new Date(item.dateCreated).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ➕ Bagian Pesan */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              5 Pesan Terbaru
            </h2>
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="bg-white p-4 rounded-lg shadow-md">
                  <p>
                    <strong>Nama:</strong> {msg.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p>
                    <strong>Pesan:</strong> {msg.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Tanggal:</strong>{" "}
                    {msg.timestamp?.toDate
                      ? msg.timestamp.toDate().toLocaleString()
                      : "Waktu tidak tersedia"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 md:right-6 text-lg md:text-xl py-3 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </AdminLayout>
  );
}
