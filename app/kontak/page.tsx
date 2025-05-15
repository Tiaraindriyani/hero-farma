"use client";

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");

    try {
      await addDoc(collection(db, "pesan"), {
        ...formData,
        timestamp: new Date(),
      });

      setFormData({ name: "", email: "", message: "" });
      setSuccessMessage("✅ Pesan berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-200 via-blue-300 to-teal-200 w-full min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">
          Hubungi Kami
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Formulir Kontak */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Formulir Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Alamat Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tulis pesan Anda..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
              >
                {isSending ? "Mengirim..." : "Kirim Pesan"}
              </button>

              {successMessage && (
                <div className="text-green-600 font-medium text-sm mt-2 text-center">
                  {successMessage}
                </div>
              )}
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Info Kontak
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Sehat No.123, Colomadu, Indonesia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Telepon</h3>
                  <p className="text-gray-600">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">Tiara@hero-farma.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Jam Operasional</h3>
                  <p className="text-gray-600">Senin - Jumat: 08:00 - 18:00</p>
                  <p className="text-gray-600">Sabtu: 08:00 - 14:00</p>
                  <p className="text-gray-600">Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-700 mt-10 text-lg">
          Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda!
        </p>
      </div>
    </div>
  );
}
