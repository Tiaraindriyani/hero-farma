"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";
import { MdDashboard, MdEvent } from "react-icons/md";
import { SiLimesurvey } from "react-icons/si";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const shouldShowSidebar = [
    "/admin/dashboard",
    "/admin/input-data",
    "/admin/riwayat",
    "/admin/pesan",
  ].includes(pathname);

  if (!shouldShowSidebar) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-blue-500 text-blue-500  p-3 rounded-md shadow-md"
      >
        <HiOutlineMenuAlt2 className="text-2xl" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`bg-blue-500 w-[300px] h-full fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="w-full h-auto p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden  p-4 text-3xl text-[#ffffff]"
          >
            <HiX />
          </button>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <p className="font-bold text-3xl text-[#ffffff]">HERO FARMA</p>
            </div>
          </div>

          <ul className="list-none p-0 mt-6">
            {[
              {
                href: "/admin/dashboard",
                icon: <MdDashboard />,
                label: "Dashboard",
              },
              {
                href: "/admin/input-data",
                icon: <FaPeopleGroup />,
                label: "Input Data",
              },
              {
                href: "/admin/riwayat",
                icon: <FaPeopleGroup />,
                label: "Riwayat",
              },
              {
                href: "/admin/pesan",
                icon: <FaPeopleGroup />,
                label: "Pesan",
              },
            ].map((item) => {
              const isActive = pathname === item.href;

              return (
                <li
                  key={item.href}
                  className={`flex p-4 my-2 mx-4 rounded-xl items-center ${
                    isActive
                      ? "bg-[#ffffff] text-blue-500 "
                      : "text-[#ffffff] hover:bg-[#ffffff] hover:text-blue-500 "
                  }`}
                >
                  <span className="text-2xl pr-2">{item.icon}</span>
                  <Link href={item.href} className="block font-bold">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
