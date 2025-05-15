"use client";

import AdminLayout from "../AdminLayout";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesRef = collection(db, "pesan");
      const messagesSnapshot = await getDocs(messagesRef);

      const messagesData = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messagesData);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  // Filter messages based on the search input
  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-slate-100 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto md:ml-[300px]">
          {/* Header Section */}
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-black text-3xl font-bold">Pesan Masuk</h1>
            <p className="text-gray-400 text-xl">Apotek Hero Farma</p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cari berdasarkan nama pengirim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Messages Section */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Nama Pengirim</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Pesan</th>
                  <th className="py-3 px-6 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg) => (
                  <tr key={msg.id} className="border-t hover:bg-gray-100">
                    <td className="py-3 px-6">{msg.name}</td>
                    <td className="py-3 px-6">{msg.email}</td>
                    <td className="py-3 px-6">{msg.message}</td>
                    <td className="py-3 px-6">
                      {msg.timestamp?.toDate
                        ? msg.timestamp.toDate().toLocaleString()
                        : "Waktu tidak tersedia"}
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
