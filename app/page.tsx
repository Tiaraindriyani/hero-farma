"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState(
    "Selamat datang di Hero Farma, apotek terpercaya untuk kesehatan Anda!"
  );

  const router = useRouter();

  return (
    <>
      <div className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400 min-h-screen flex justify-center items-center text-center text-white font-serif tracking-wide">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40"></div>

        <div className="z-10 px-6 py-12 md:px-12 lg:px-24 text-center">
          <Image
            src="/assets/images/LOGO.png"
            alt="Hero Farma Logo"
            width={260} // diperbesar
            height={260} // diperbesar
            className="mx-auto mb-8"
          />

          <h1 className="text-6xl font-extrabold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Selamat Datang di{" "}
            <span className="text-yellow-300 drop-shadow-lg">Hero Farma</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 opacity-95 drop-shadow-sm">{message}</p>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => router.push("/tentang-kami")}
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Pelajari Lebih Lanjut
            </button>

            <button
              onClick={() => router.push("/produk")}
              className="bg-yellow-300 text-gray-900 py-3 px-8 rounded-xl hover:bg-yellow-400 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Lihat Produk
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
