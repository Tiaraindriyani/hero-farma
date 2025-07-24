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

          {/* Info Kontak */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Info Kontak</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Ngemplak, Ngampo, Kismoyoso, Kec. Ngemplak, Kabupaten Boyolali, Jawa Tengah 57375
                  </p>
                  {/* Google Maps Embed */}
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <iframe
                      title="Lokasi Hero Farma"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7727582749917!2d110.6960834!3d-7.551622799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1511adad7199%3A0x2bb4799bc44f0e53!2sKismoyo%2C%20Ngemplak%2C%20Boyolali%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1721440000000!5m2!1sen!2sid"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Telepon</h3>
                  <p className="text-gray-600">+6285643724684</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">hero-farma@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Jam Operasional</h3>
                  <p className="text-gray-600">Senin - Minggu : 07:00 - 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pesan Terima Kasih di bawah grid */}
        <p className="text-center text-gray-700 mt-10 text-lg">
          Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda!
        </p>
      </div>
    </div>
  );
}
