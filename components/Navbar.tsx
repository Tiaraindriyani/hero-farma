"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Import usePathname untuk mendapatkan path saat ini

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Gunakan usePathname untuk mendapatkan path saat ini

  // Cek jika URL saat ini mengarah ke direktori /admin
  if (pathname.startsWith("/admin")) {
    return null; // Jika di direktori /admin, navbar tidak akan ditampilkan
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg fixed w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo & Nama */}
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/images/logo.png" // Ganti dengan path logo
            alt="Hero Farma Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-white text-2xl font-semibold">Hero Farma</span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/tentang-kami"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Tentang Kami
          </Link>
          <Link
            href="/produk"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Produk
          </Link>
          <Link
            href="/rekomendasi"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Rekomendasi
          </Link>
          <Link
            href="/kontak"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Kontak
          </Link>
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu untuk Mobile */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-blue-500 text-white py-4 space-y-4`}
      >
        <Link href="/" className="block text-center hover:text-yellow-400">
          Home
        </Link>
        <Link
          href="/tentang-kami"
          className="block text-center hover:text-yellow-400"
        >
          Tentang Kami
        </Link>
        <Link
          href="/produk"
          className="block text-center hover:text-yellow-400"
        >
          Produk
        </Link>
        <Link
          href="/rekomendasi"
          className="block text-center hover:text-yellow-400"
        >
          Rekomendasi
        </Link>
        <Link
          href="/kontak"
          className="block text-center hover:text-yellow-400"
        >
          Kontak
        </Link>
      </div>
    </nav>
  );
}
