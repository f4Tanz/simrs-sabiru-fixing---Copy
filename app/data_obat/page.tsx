"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaPills, FaUserMd, FaUserInjured, FaClipboardList,
  FaLock, FaPlus, FaListUl, FaHome, FaCog
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface Medicine {
  name: string;
  category: string;
  stock: number;
  expiry: string;
}

export default function DataObat() {
  const router = useRouter();

  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: "OBH (Anak)", category: "Obat Non Keras", stock: 50, expiry: "20/7/2027" },
    { name: "Paracetamol", category: "Obat Bebas", stock: 100, expiry: "15/6/2026" },
    { name: "Amoxicillin", category: "Antibiotik", stock: 75, expiry: "10/3/2028" },
    { name: "Ibuprofen", category: "Obat Anti Inflamasi", stock: 60, expiry: "5/9/2027" },
    { name: "Cetirizine", category: "Obat Alergi", stock: 80, expiry: "30/11/2025" },
  ]);
  const [search, setSearch] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    category: "",
    stock: "",
    expiry: "",
  });

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setFilteredMedicines(
      medicines.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, medicines]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines([
      ...medicines,
      {
        name: newMedicine.name,
        category: newMedicine.category,
        stock: Number(newMedicine.stock),
        expiry: newMedicine.expiry,
      },
    ]);
    setShowAddForm(false);
    setNewMedicine({ name: "", category: "", stock: "", expiry: "" });
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#E6F0FF] text-black"}`}>
      {/* Sidebar */}
      <aside className={`w-80 p-8 flex flex-col justify-between fixed h-full ${
        darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white" : "bg-gradient-to-b from-[#4599D6] to-[#093362] text-white"
      }`}>
        <div>
          <h2 className="text-4xl font-bold mb-70">Rekam Medis</h2>
          <ul className="space-y-6 text-xl">
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/dashboard")}><FaHome /> Dashboard</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/kategori_obat")}><FaListUl /> Kategori Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-3xl font-extrabold"><FaPlus /> Data Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_pasien")}><FaUserInjured /> Data Pasien</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/data_dokter")}><FaUserMd /> Data Dokter</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/rekam_medis")}><FaClipboardList /> Rekam Medis</li>
            <li className="flex items-center gap-4 cursor-pointer text-2xl font-bold" onClick={() => router.push("/password")}><FaLock /> Profile</li>
          </ul>
        </div>
        <p className="text-lg">© 2025 Sabiru Development</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-12 ml-80">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl font-bold">Data Obat</h1>
          <div className="flex items-center gap-6">
            {time && <div className="text-2xl font-semibold">{time}</div>}
            <FaCog onClick={() => setShowSettings(!showSettings)} className="text-3xl cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
              darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            + Tambah Obat
          </button>
          <div className={`flex items-center px-6 py-3 rounded-full shadow-md w-full max-w-xl ${
            darkMode ? "bg-gray-700" : "bg-white"
          }`}>
            <FiSearch className="text-xl text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className={`ml-4 outline-none text-lg w-full ${
                darkMode ? "bg-gray-700 text-gray-300" : "text-black"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className={`min-w-full text-white rounded-lg overflow-hidden ${
            darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-[#4599D6] to-[#093362]"
          }`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-[#093362]"} text-left text-lg`}>
                <th className="px-6 py-4">Nama Obat</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4">Kadaluarsa</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine, index) => (
                <tr key={index} className="border-b border-white/20 hover:bg-[#387bb1] dark:hover:bg-gray-700 transition-all">
                  <td className="px-6 py-4">{medicine.name}</td>
                  <td className="px-6 py-4">{medicine.category}</td>
                  <td className="px-6 py-4">{medicine.stock}</td>
                  <td className="px-6 py-4">{medicine.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Settings Popup */}
        {showSettings && (
          <div className={`fixed top-20 right-20 rounded-xl shadow-xl p-6 z-50 w-80 border ${
            darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
          }`}>
            <h3 className="text-2xl font-bold mb-4">Pengaturan</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-8 rounded-full flex items-center transition-all duration-300 ${
                  darkMode ? "bg-blue-700" : "bg-gray-300"
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                  darkMode ? "translate-x-8" : "translate-x-1"
                }`} />
              </button>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className={`mt-4 px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Tutup
            </button>
          </div>
        )}

        {/* Tambah Obat Form */}
        {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className={`w-[400px] rounded-xl shadow-xl p-6 border ${
              darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
            }`}>
              <h3 className="text-2xl font-bold mb-4">Tambah Obat Baru</h3>
              <form onSubmit={handleAddMedicine} className="space-y-4">
                <div>
                  <label className="block mb-1">Nama Obat</label>
                  <input type="text" value={newMedicine.name} onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} className="w-full p-2 border rounded-md text-black" required />
                </div>
                <div>
                  <label className="block mb-1">Kategori</label>
                  <input type="text" value={newMedicine.category} onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })} className="w-full p-2 border rounded-md text-black" required />
                </div>
                <div>
                  <label className="block mb-1">Stok</label>
                  <input type="number" value={newMedicine.stock} onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })} className="w-full p-2 border rounded-md text-black" required />
                </div>
                <div>
                  <label className="block mb-1">Tanggal Kadaluarsa</label>
                  <input type="text" value={newMedicine.expiry} onChange={(e) => setNewMedicine({ ...newMedicine, expiry: e.target.value })} className="w-full p-2 border rounded-md text-black" required />
                </div>
                <div className="flex justify-end gap-4 pt-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}>Batal</button>
                  <button type="submit" className={`px-4 py-2 rounded-md ${darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
