"use client";

import { FaHeartbeat, FaBullseye, FaHandsHelping } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className="bg-gradient-to-b from-blue-700 via-cyan-600 to-emerald-500 min-h-screen pt-28 pb-16 px-4 md:px-8 font-sans tracking-normal text-gray-800">
      <div className="max-w-6xl mx-auto space-y-14 animate-fade-in">
        
        <div className="grid gap-10 md:grid-cols-2">
          {/* Visi */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300 hover:shadow-cyan-300/50">
            <div className="flex items-center mb-4 space-x-3">
              <FaBullseye className="text-blue-500 text-2xl" />
              <h2 className="text-xl font-semibold text-gray-800">Visi</h2>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              Menjadi apotek terpercaya yang memberikan pelayanan kesehatan terbaik, berkualitas, dan mudah diakses oleh seluruh lapisan masyarakat.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300 hover:shadow-red-300/50">
            <div className="flex items-center mb-4 space-x-3">
              <FaHeartbeat className="text-red-500 text-2xl" />
              <h2 className="text-xl font-semibold text-gray-800">Misi</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base leading-relaxed">
              <li>Menyediakan obat-obatan, vitamin, dan produk kesehatan yang lengkap, asli, dan berkualitas.</li>
              <li>Memberikan pelayanan yang ramah, cepat, dan profesional kepada setiap pelanggan.</li>
              <li>Menyediakan layanan konsultasi apoteker untuk membantu masyarakat memahami penggunaan obat secara tepat.</li>
            </ul>
          </div>
        </div>

        {/* Komitmen */}
        <section className="bg-white rounded-xl shadow-xl p-6 md:p-8 hover:shadow-green-300/50 transition-shadow duration-300">
          <div className="flex items-center mb-4 space-x-3">
            <FaHandsHelping className="text-green-500 text-2xl" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Komitmen Kami</h2>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            Kami berkomitmen untuk selalu memberikan pelayanan terbaik, serta produk kesehatan yang terjamin kualitasnya. Dengan pendekatan yang modern, kami siap melayani kebutuhan kesehatan Anda kapan saja dan di mana saja.
          </p>
        </section>

        <div className="text-center mt-4">
          <p className="text-base text-white drop-shadow-md">
            Terima kasih telah memilih kami sebagai mitra kesehatan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
