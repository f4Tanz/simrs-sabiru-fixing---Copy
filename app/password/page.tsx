"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaPills,
  FaUserMd,
  FaUserInjured,
  FaClipboardList,
  FaLock,
  FaPlus,
  FaListUl,
  FaHome,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Akun() {
  const router = useRouter();

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const pageBg = isDark ? "bg-gray-900 text-white" : "bg-[#E6F0FF] text-gray-900";
  const cardBg = isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const inputCls = isDark
    ? "bg-gray-700 border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-900";
  const sidebarBg = isDark
    ? "bg-gradient-to-b from-[#1E293B] to-[#0F172A]"
    : "bg-gradient-to-b from-[#4599D6] to-[#093362]";

  return (
    <div className={`flex h-screen ${pageBg}`}>
      {/* Sidebar */}
      <aside className={`fixed h-full w-80 ${sidebarBg} text-white p-8 flex flex-col justify-between`}>
        <div>
          <h2 className="text-4xl font-bold mb-70">Rekam Medis</h2>
          <ul className="space-y-6 text-xl">
            <li onClick={() => router.push("/dashboard")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaHome /> Dashboard</li>
            <li onClick={() => router.push("/kategori_obat")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaListUl /> Kategori Obat</li>
            <li onClick={() => router.push("/data_obat")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaPlus /> Data Obat</li>
            <li onClick={() => router.push("/data_pasien")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaUserInjured /> Data Pasien</li>
            <li onClick={() => router.push("/data_dokter")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaUserMd /> Data Dokter</li>
            <li onClick={() => router.push("/rekam_medis")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaClipboardList /> Rekam Medis</li>
            <li onClick={() => router.push("/password")} className="flex items-center gap-4 cursor-pointer text-3xl font-bold"><FaLock /> Profile</li>
          </ul>
        </div>
        <p className="text-lg">© 2025 Sabiru Development</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 ml-80">
        <header className="relative flex justify-between items-center mb-10">
          <h1 className="text-6xl font-bold">Pengaturan Akun</h1>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold">{time}</div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`${cardBg} p-3 rounded-full`}
            >
              <FaCog className="text-xl" />
            </button>

            {menuOpen && (
              <div
                className={`${cardBg} absolute right-0 top-14 w-48 rounded-xl shadow-lg p-4 z-20`}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg"
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${cardBg} p-6 rounded-xl shadow-md`}>
            <h2 className="text-2xl font-bold mb-4">Ganti Foto Profil</h2>
            <input type="file" className="block mb-4" />
            <button className="bg-[#4599D6] text-white px-4 py-2 rounded-lg">Upload</button>
          </div>

          <div className={`${cardBg} p-6 rounded-xl shadow-md`}>
            <h2 className="text-2xl font-bold mb-4">Ganti Password</h2>
            <input type="password" placeholder="Password Lama" className={`block w-full mb-3 p-3 rounded-lg border ${inputCls}`} />
            <input type="password" placeholder="Password Baru" className={`block w-full mb-3 p-3 rounded-lg border ${inputCls}`} />
            <input type="password" placeholder="Konfirmasi Password Baru" className={`block w-full mb-4 p-3 rounded-lg border ${inputCls}`} />
            <button className="bg-[#4599D6] text-white px-4 py-2 rounded-lg">Simpan Password</button>
          </div>

          <div className={`${cardBg} p-6 rounded-xl shadow-md md:col-span-2`}>
            <h2 className="text-2xl font-bold mb-4">Informasi Akun</h2>
            <input type="text" placeholder="Nama Lengkap" className={`block w-full mb-3 p-3 rounded-lg border ${inputCls}`} />
            <input type="email" placeholder="Email" className={`block w-full mb-3 p-3 rounded-lg border ${inputCls}`} />
            <button className="bg-[#4599D6] text-white px-4 py-2 rounded-lg">Update Informasi</button>
          </div>
        </div>
      </main>
    </div>
  );
}
