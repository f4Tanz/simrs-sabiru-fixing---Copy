"use client";

import { useState, useEffect, FormEvent } from "react";
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
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface Medicine {
  name: string;
  category: string;
  expiry: string; // format: DD/M/YYYY
}

// ─────────────────────────────────────────────────────────
//  Dummy data awal
// ─────────────────────────────────────────────────────────
const initialMedicines: Medicine[] = [
  { name: "OBH (Anak)", category: "Obat Non Keras", expiry: "20/7/2027" },
  { name: "Paracetamol", category: "Obat Bebas", expiry: "15/6/2026" },
  { name: "Amoxicillin", category: "Antibiotik", expiry: "10/3/2028" },
  { name: "Ibuprofen", category: "Obat Anti Inflamasi", expiry: "5/9/2027" },
  { name: "Cetirizine", category: "Obat Alergi", expiry: "30/11/2025" },
  { name: "Omeprazole", category: "Obat Lambung", expiry: "22/8/2026" },
  { name: "Aspirin", category: "Obat Pengencer Darah", expiry: "12/4/2029" },
  { name: "Salbutamol", category: "Obat Pernapasan", expiry: "18/5/2028" },
  { name: "Metformin", category: "Obat Diabetes", expiry: "7/12/2026" },
  { name: "Losartan", category: "Obat Hipertensi", expiry: "3/1/2027" },
  { name: "Atorvastatin", category: "Obat Kolesterol", expiry: "9/10/2026" },
  { name: "Dexamethasone", category: "Kortikosteroid", expiry: "14/7/2027" },
  { name: "Mefenamic Acid", category: "Obat Nyeri", expiry: "6/2/2028" },
  { name: "Clindamycin", category: "Antibiotik", expiry: "19/6/2027" },
  { name: "Diazepam", category: "Obat Penenang", expiry: "27/9/2025" },
  { name: "Loperamide", category: "Obat Diare", expiry: "1/8/2026" },
  { name: "Hydrochlorothiazide", category: "Diuretik", expiry: "23/3/2027" },
  { name: "Cetirizine", category: "Antihistamin", expiry: "11/11/2028" },
  { name: "Furosemide", category: "Diuretik", expiry: "4/5/2029" },
  { name: "Nifedipine", category: "Obat Hipertensi", expiry: "8/6/2026" },
];

// ─────────────────────────────────────────────────────────
//  Utility
// ─────────────────────────────────────────────────────────
const formatExpiry = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

// ─────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────
export default function KategoriObat() {
  const [medList, setMedList] = useState<Medicine[]>(initialMedicines);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>(initialMedicines);

  const [time, setTime] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ── Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState<Medicine>({ name: "", category: "", expiry: "" });

  const router = useRouter();

  // ── Derived categories (dinamis)
  const categories = ["Semua", ...new Set(medList.map((m) => m.category))];

  // ── Filter logic
  useEffect(() => {
    setFilteredMedicines(
      medList.filter(
        (med) =>
          med.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "Semua" || med.category === category)
      )
    );
  }, [search, category, medList]);

  // ── Clock
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // ── Handlers
  const handleAddMedicine = (e: FormEvent) => {
    e.preventDefault();
    if (!newMed.name || !newMed.category || !newMed.expiry) return;

    // Simpan dengan format tanggal DD/M/YYYY
    const formattedMed: Medicine = {
      name: newMed.name,
      category: newMed.category,
      expiry: formatExpiry(newMed.expiry),
    };

    setMedList([...medList, formattedMed]);
    setShowAddModal(false);
    setNewMed({ name: "", category: "", expiry: "" });
  };

  return (
    <div
      className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#E6F0FF] text-black"}`}
    >
      {/* ───────────────── Sidebar ───────────────── */}
      <aside
        className={`w-80 p-8 flex flex-col justify-between fixed h-full ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-b from-[#4599D6] to-[#093362] text-white"
        }`}
      >
        <div>
          <h2 className="text-4xl font-bold mb-70">Rekam Medis</h2>
          <ul className="space-y-6 text-xl">
            <li
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
              onClick={() => router.push("/dashboard")}
            >
              <FaHome /> Dashboard
            </li>
            <li className="flex items-center gap-4 cursor-pointer text-3xl font-extrabold">
              <FaListUl /> Kategori Obat
            </li>
            <li
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
              onClick={() => router.push("/data_obat")}
            >
              <FaPlus /> Data Obat
            </li>
            <li
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
              onClick={() => router.push("/data_pasien")}
            >
              <FaUserInjured /> Data Pasien
            </li>
            <li
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
              onClick={() => router.push("/data_dokter")}
            >
              <FaUserMd /> Data Dokter
            </li>
            <li
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
              onClick={() => router.push("/rekam_medis")}
            >
              <FaClipboardList /> Rekam Medis
            </li>
            <li
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
              onClick={() => router.push("/password")}
            >
              <FaLock /> Profile
            </li>
          </ul>
        </div>
        <p className="text-lg">Copyright © 2025 Sabiru Development</p>
      </aside>

      {/* ───────────────── Main ───────────────── */}
      <main
        className={`flex-1 p-12 ml-80 ${darkMode ? "bg-gray-900 text-white" : "bg-[#E6F0FF] text-black"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl font-bold">Kategori Obat</h1>
          <div className="flex items-center gap-6">
            {time && <div className="text-2xl font-semibold">{time}</div>}
            {/* Settings */}
            <FaCog
              onClick={() => setShowSettings(!showSettings)}
              className="text-3xl cursor-pointer text-white dark:text-gray-700"
              title="Settings"
            />
          </div>
        </div>

        {/* Settings pop-up */}
        {showSettings && (
          <div
            className={`fixed top-20 right-20 rounded-xl shadow-xl p-6 z-50 w-80 border ${
              darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">Pengaturan</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Dark Mode</span>
              <button
                className={`w-16 h-8 rounded-full flex items-center transition-all duration-300 ${
                  darkMode ? "bg-blue-700" : "bg-gray-300"
                }`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                    darkMode ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className={`mt-4 px-4 py-2 rounded-lg hover:bg-gray-300 ${
                darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800"
              }`}
            >
              Tutup
            </button>
          </div>
        )}

        {/* Filter & Search & Add */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          {/* Kategori */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-4 py-3 rounded-lg shadow-md text-lg outline-none ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-black"
            }`}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} className={darkMode ? "text-gray-300" : "text-black"}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search */}
          <div
            className={`flex items-center px-6 py-3 rounded-full shadow-md flex-1 max-w-xl ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <FiSearch className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-400"}`} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`ml-4 outline-none text-lg flex-1 ${
                darkMode ? "bg-gray-700 text-gray-300 placeholder-gray-400" : "bg-white text-black placeholder-gray-500"
              }`}
            />
          </div>

          {/* + Tambah */}
          <button
            onClick={() => setShowAddModal(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold shadow-md ${
              darkMode
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-[#4599D6] hover:bg-[#387bb1] text-white"
            }`}
          >
            <FaPlus /> Tambah
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table
            className={`min-w-full text-white rounded-lg overflow-hidden ${
              darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-[#4599D6] to-[#093362]"
            }`}
          >
            <thead>
              <tr className={`text-left text-lg ${darkMode ? "bg-gray-700" : "bg-[#093362]"}`}>
                <th className="px-6 py-4">Nama Obat</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Kadaluarsa</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((med, idx) => (
                <tr
                  key={idx}
                  className={`border-b ${
                    darkMode ? "border-gray-600" : "border-white/20"
                  } hover:bg-opacity-50 transition-all ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-[#387bb1]"
                  }`}
                >
                  <td className="px-6 py-4">{med.name}</td>
                  <td className="px-6 py-4">{med.category}</td>
                  <td className="px-6 py-4">{med.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* ───────────────── Add Medicine Modal ───────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <form
            onSubmit={handleAddMedicine}
            className={`w-full max-w-md rounded-xl p-8 shadow-xl ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaPills /> Tambah Obat
            </h2>

            {/* Nama */}
            <label className="block mb-4">
              <span className="block mb-1">Nama Obat</span>
              <input
                type="text"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg outline-none ${
                  darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"
                }`}
                required
              />
            </label>

            {/* Kategori */}
            <label className="block mb-4">
              <span className="block mb-1">Kategori</span>
              <input
                type="text"
                list="kategori-list"
                value={newMed.category}
                onChange={(e) => setNewMed({ ...newMed, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg outline-none ${
                  darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"
                }`}
                required
              />
              <datalist id="kategori-list">
                {Array.from(new Set(medList.map((m) => m.category))).map((cat, idx) => (
                  <option key={idx} value={cat} />
                ))}
              </datalist>
            </label>

            {/* Kadaluarsa */}
            <label className="block mb-6">
              <span className="block mb-1">Tanggal Kadaluarsa</span>
              <input
                type="date"
                value={newMed.expiry}
                onChange={(e) => setNewMed({ ...newMed, expiry: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg outline-none ${
                  darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"
                }`}
                required
              />
            </label>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-black"
                }`}
              >
                Batal
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                  darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-[#4599D6] hover:bg-[#387bb1]"
                } text-white`}
              >
                <FaPlus /> Tambah
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
