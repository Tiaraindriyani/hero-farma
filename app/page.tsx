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
      <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex justify-center items-center text-center text-white">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

        <div className="z-10 px-6 py-12 md:px-12 lg:px-24 text-center">
          <Image
            src="/assets/images/logo.png"
            alt="Hero Farma Logo"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-extrabold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Selamat Datang di{" "}
            <span className="text-yellow-400">Hero Farma</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 opacity-90">{message}</p>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => router.push("/tentang-kami")}
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition duration-300 transform hover:scale-105"
            >
              Pelajari Lebih Lanjut
            </button>

            <button
              onClick={() => router.push("/produk")}
              className="bg-yellow-400 text-gray-800 py-3 px-8 rounded-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
            >
              Lihat Produk
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
