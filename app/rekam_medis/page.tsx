"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserMd,
  FaUserInjured,
  FaClipboardList,
  FaLock,
  FaPlus,
  FaListUl,
  FaHome,
  FaCog,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface RekamMedis {
  nama: string;
  tanggal: string;
  diagnosa: string;
  tindakan: string;
  dokter: string;
  catatan: string;
}

export default function RekamMedisPage() {
  const router = useRouter();

  /* ---------- STATE ---------- */
  const [search, setSearch] = useState("");
  const [rekamMedis, setRekamMedis] = useState<RekamMedis[]>([
    {
      nama: "Ahmad Riyadi",
      tanggal: "2025-05-01",
      diagnosa: "Diabetes",
      tindakan: "Pemberian Obat",
      dokter: "Dr. Ahmad Subagio",
      catatan: "Kurangi konsumsi gula berlebihan.",
    },
    {
      nama: "Siti Aisyah",
      tanggal: "2025-05-03",
      diagnosa: "Hipertensi",
      tindakan: "Pemberian Terapi",
      dokter: "Dr. Siti Marlina",
      catatan: "Kontrol ulang 5 hari lagi.",
    },
  ]);
  const [filteredRekamMedis, setFilteredRekamMedis] = useState<RekamMedis[]>(rekamMedis);

  const [time, setTime] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [newRekamMedis, setNewRekamMedis] = useState<RekamMedis>({
    nama: "",
    tanggal: "",
    diagnosa: "",
    tindakan: "",
    dokter: "",
    catatan: "",
  });

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setFilteredRekamMedis(
      rekamMedis.filter((rm) =>
        rm.nama.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rekamMedis]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  /* ---------- HANDLERS ---------- */
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleTambah = () => {
    setRekamMedis([...rekamMedis, newRekamMedis]);
    setShowPopup(false);
    setNewRekamMedis({
      nama: "",
      tanggal: "",
      diagnosa: "",
      tindakan: "",
      dokter: "",
      catatan: "",
    });
  };

  /* ---------- RENDER ---------- */
  return (
    <div className={`flex h-screen ${isDark ? "bg-[#1e1e1e] text-white" : "bg-[#E6F0FF] text-black"}`}>
      {/* Sidebar */}
      <aside className={`w-80 p-8 flex flex-col justify-between fixed h-full ${isDark ? "bg-[#111] text-white" : "bg-gradient-to-b from-[#4599D6] to-[#093362] text-white"}`}>
        <div>
          <h2 className="text-4xl font-bold mb-70">Rekam Medis</h2>
          <ul className="space-y-6 text-xl">
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/dashboard")}><FaHome /> Dashboard</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/kategori_obat")}><FaListUl /> Kategori Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_obat")}><FaPlus /> Data Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_pasien")}><FaUserInjured /> Data Pasien</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_dokter")}><FaUserMd /> Data Dokter</li>
            <li className="flex items-center gap-4 cursor-pointer text-3xl font-extrabold"><FaClipboardList /> Rekam Medis</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/password")}><FaLock /> Profile</li>
          </ul>
        </div>
        <p className="text-lg">Copyright © 2025 Sabiru Development</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 ml-80">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-6xl font-bold">Rekam Medis</h1>
            <button
              onClick={() => setShowPopup(true)}
              className="mt-4 bg-[#093362] text-white px-6 py-2 rounded-full text-lg"
            >
              + Tambah
            </button>
          </div>

          {/* Clock & Settings */}
          <div className="flex items-center gap-4 relative">
            {time && <div className="text-2xl font-semibold">{time}</div>}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-full bg-white shadow-md"
            >
              <FaCog className="text-xl text-gray-700" />
            </button>

            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute top-14 right-0 bg-white border p-4 rounded-lg shadow z-10 text-black w-56">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Darkmode</span>

                  {/* Custom toggle switch */}
                  <button
                    onClick={toggleDarkMode}
                    className={`
                      w-14 h-8 flex items-center rounded-full p-1 duration-300
                      ${isDark ? "bg-[#093362]" : "bg-gray-300"}
                    `}
                  >
                    <div
                      className={`
                        bg-white w-6 h-6 rounded-full shadow-md transform duration-300
                        ${isDark ? "translate-x-6" : "translate-x-0"}
                      `}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className={`flex items-center px-6 py-3 rounded-full shadow-md w-full max-w-xl mb-6 ${isDark ? "bg-[#333] text-white" : "bg-white"}`}>
          <FiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Cari Nama Pasien"
            className="ml-4 outline-none text-lg w-full bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className={`min-w-full text-white rounded-lg overflow-hidden ${isDark ? "bg-[#333]" : "bg-gradient-to-b from-[#4599D6] to-[#4599D6]"}`}>
            <thead>
              <tr className={`text-left text-lg ${isDark ? "bg-[#222]" : "bg-[#093362]"}`}>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Diagnosa</th>
                <th className="px-6 py-4">Tindakan</th>
                <th className="px-6 py-4">Dokter</th>
                <th className="px-6 py-4">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {filteredRekamMedis.map((rm, index) => (
                <tr
                  key={index}
                  className={`${isDark ? "border-b border-gray-600" : "border-b border-white/20 hover:bg-[#387bb1]"} transition-all`}
                >
                  <td className="px-6 py-4">{rm.nama}</td>
                  <td className="px-6 py-4">{rm.tanggal}</td>
                  <td className="px-6 py-4">{rm.diagnosa}</td>
                  <td className="px-6 py-4">{rm.tindakan}</td>
                  <td className="px-6 py-4">{rm.dokter}</td>
                  <td className="px-6 py-4">{rm.catatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className={`rounded-2xl p-8 w-full max-w-2xl relative shadow-lg ${isDark ? "bg-[#222] text-white" : "bg-white text-black"}`}>
            <h2 className="text-3xl font-bold mb-6">Tambah Rekam Medis</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Nama Pasien" className="border p-3 rounded bg-transparent" value={newRekamMedis.nama} onChange={(e) => setNewRekamMedis({ ...newRekamMedis, nama: e.target.value })} />
              <input type="date" className="border p-3 rounded bg-transparent" value={newRekamMedis.tanggal} onChange={(e) => setNewRekamMedis({ ...newRekamMedis, tanggal: e.target.value })} />
              <input type="text" placeholder="Diagnosa" className="border p-3 rounded bg-transparent" value={newRekamMedis.diagnosa} onChange={(e) => setNewRekamMedis({ ...newRekamMedis, diagnosa: e.target.value })} />
              <input type="text" placeholder="Tindakan" className="border p-3 rounded bg-transparent" value={newRekamMedis.tindakan} onChange={(e) => setNewRekamMedis({ ...newRekamMedis, tindakan: e.target.value })} />
              <input type="text" placeholder="Dokter" className="border p-3 rounded bg-transparent" value={newRekamMedis.dokter} onChange={(e) => setNewRekamMedis({ ...newRekamMedis, dokter: e.target.value })} />
              <input type="text" placeholder="Catatan" className="border p-3 rounded bg-transparent" value={newRekamMedis.catatan} onChange={(e) => setNewRekamMedis({ ...newRekamMedis, catatan: e.target.value })} />
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowPopup(false)} className="bg-gray-400 text-white px-6 py-2 rounded">Batal</button>
              <button onClick={handleTambah} className="bg-blue-600 text-white px-6 py-2 rounded">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
