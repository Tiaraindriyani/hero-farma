"use client";

import { FaHeartbeat, FaBullseye, FaHandsHelping } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-teal-400 min-h-screen flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-6xl w-full space-y-14 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-md">
          Tentang Kami
        </h1>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Visi */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center mb-5 space-x-3">
              <FaBullseye className="text-blue-500 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">Visi</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi apotek terpercaya yang memberikan pelayanan kesehatan
              terbaik, berkualitas, dan mudah diakses oleh seluruh lapisan
              masyarakat.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center mb-5 space-x-3">
              <FaHeartbeat className="text-red-500 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">Misi</h2>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg leading-relaxed">
              <li>
                Menyediakan obat-obatan, vitamin, dan produk kesehatan yang
                lengkap, asli, dan berkualitas.
              </li>
              <li>
                Memberikan pelayanan yang ramah, cepat, dan profesional kepada
                setiap pelanggan.
              </li>
              <li>
                Menyediakan layanan konsultasi apoteker untuk membantu
                masyarakat memahami penggunaan obat secara tepat.
              </li>
            </ul>
          </div>
        </div>

        {/* Komitmen Kami */}
        <section className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center mb-5 space-x-3">
            <FaHandsHelping className="text-green-500 text-3xl" />
            <h2 className="text-3xl font-bold text-gray-800">Komitmen Kami</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Kami berkomitmen untuk selalu memberikan pelayanan terbaik, serta
            produk kesehatan yang terjamin kualitasnya. Dengan pendekatan yang
            modern, kami siap melayani kebutuhan kesehatan Anda kapan saja dan
            di mana saja.
          </p>
        </section>

        <div className="text-center mt-6">
          <p className="text-lg text-white">
            Terima kasih telah memilih kami sebagai mitra kesehatan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
