"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import {
  FaCog, FaListUl, FaPlus, FaUserInjured,
  FaUserMd, FaClipboardList, FaLock, FaHome
} from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const [time, setTime] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [dataCounts, setDataCounts] = useState({
    obat: 5,
    rekamMedis: 2,
    pasien: 5,
    dokter: 2,
  });

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className={`flex h-screen font-poppins ${darkMode ? "bg-gray-900 text-white" : "bg-[#E6F0FF] text-black"}`}>
      {/* Sidebar */}
      <aside className={`w-80 text-white p-8 flex flex-col justify-between ${darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-[#4599D6] to-[#093362]"}`}>
        <div>
          <h2 className="text-4xl font-bold mb-70">Rekam Medis</h2>
          <ul className="space-y-6 text-xl">
            <li className="flex items-center gap-4 cursor-pointer text-3xl font-extrabold" onClick={() => router.push("/dashboard")}><FaHome /> Dashboard</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/kategori_obat")}><FaListUl /> Kategori Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_obat")}><FaPlus /> Data Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_pasien")}><FaUserInjured /> Data Pasien</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_dokter")}><FaUserMd /> Data Dokter</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/rekam_medis")}><FaClipboardList /> Rekam Medis</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/password")}><FaLock /> Profile</li>
          </ul>
        </div>
        <p className="text-lg">Copyright © 2025 Sabiru Development</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-8">
            {time && <div className="text-2xl font-semibold">{time}</div>}
            <div className={`flex items-center px-6 py-5 rounded-full shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <FiSearch className="text-gray-400 text-xl" />
              <input type="text" placeholder="Search" className={`ml-4 outline-none text-xl ${darkMode ? "bg-gray-800 text-white" : "text-black"}`} />
            </div>
            <FaCog onClick={() => setShowSettings(!showSettings)} className="text-4xl cursor-pointer text-white dark:text-gray-700" />
          </div>
        </div>
        <p className="mb-10 text-2xl">Selamat datang. Jaga kesehatan dan selamat bekerja.</p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-10">
          {[
            { label: "Data Obat", count: dataCounts.obat, route: "/data_obat" },
            { label: "Data Rekam Medis", count: dataCounts.rekamMedis, route: "/rekam_medis" },
            { label: "Data Pasien", count: dataCounts.pasien, route: "/data_pasien" },
            { label: "Data Dokter", count: dataCounts.dokter, route: "/data_dokter" },
          ].map((card, i) => (
            <div key={i} className={`text-white p-14 rounded-xl shadow-lg text-center ${darkMode ? "bg-gradient-to-b from-gray-700 to-gray-900" : "bg-gradient-to-b from-[#4599D6] to-[#093362]"}`}>
              <h2 className="text-7xl font-bold">{card.count}</h2>
              <p className="text-3xl">{card.label}</p>
              <button onClick={() => router.push(card.route)} className={`mt-8 px-10 py-5 rounded-lg text-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-[#1F5BA7]"}`}>Lihat →</button>
            </div>
          ))}
        </div>

        {/* Settings Popup */}
        {showSettings && (
          <div className={`fixed top-20 right-20 rounded-xl shadow-xl p-6 z-50 w-80 border ${darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}>
            <h3 className="text-2xl font-poppins mb-4">Pengaturan</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Dark Mode</span>
              <button
                className={`w-16 h-8 rounded-full flex items-center transition-all duration-300 ${darkMode ? "bg-blue-700" : "bg-gray-300"}`}
                onClick={toggleDarkMode}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${darkMode ? "translate-x-8" : "translate-x-1"}`} />
              </button>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className={`mt-4 px-4 py-2 rounded-lg hover:bg-gray-300 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800"}`}
            >
              Tutup
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
