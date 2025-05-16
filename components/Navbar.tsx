"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md fixed w-full z-50 font-semibold text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo & Nama Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/20 p-1 backdrop-blur-sm">
            <Image
              src="/assets/images/LOGO.png"
              alt="Hero Farma Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="text-2xl drop-shadow-md tracking-wide">Hero Farma</span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-10 text-lg">
          {[
            { href: "/", label: "Home" },
            { href: "/tentang-kami", label: "Tentang Kami" },
            { href: "/produk", label: "Produk" },
            { href: "/rekomendasi", label: "Rekomendasi" },
            { href: "/kontak", label: "Kontak" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-yellow-300 transition duration-300 hover:scale-105"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-indigo-500 bg-opacity-95 border-t border-white/20 py-4 px-6 space-y-4 text-center`}
      >
        {[
          { href: "/", label: "Home" },
          { href: "/tentang-kami", label: "Tentang Kami" },
          { href: "/produk", label: "Produk" },
          { href: "/rekomendasi", label: "Rekomendasi" },
          { href: "/kontak", label: "Kontak" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-white hover:text-yellow-300 transition duration-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
