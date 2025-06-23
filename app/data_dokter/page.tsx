"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserMd,
  FaUserInjured,
  FaClipboardList,
  FaLock,
  FaPlus,
  FaListUl,
  FaHome,
  FaTrash,
  FaPen,
  FaCog,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

interface Dokter {
  name: string;
  email: string;
  photo: string;
  spesialis: string;
  status: string;
  telp: string;
  alamat: string;
}

/**
 * Simple animated switch component
 */
const Switch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
        checked ? "bg-blue-600" : "bg-gray-400"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-4 h-4 rounded-full bg-white shadow"
        style={{ x: checked ? "calc(100% - 16px)" : 0 }}
      />
    </div>
  );
};

export default function DataDokter() {
  const router = useRouter();

  /* -------------------- STATE -------------------- */
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [search, setSearch] = useState("");
  const [dokters, setDokters] = useState<Dokter[]>([
    {
      name: "Dr. Ahmad Subagio",
      email: "ahmad.subagio@email.com",
      photo: "https://i.pravatar.cc/100?img=1",
      spesialis: "Penyakit Dalam",
      status: "Aktif",
      telp: "081234567890",
      alamat: "Jl. Merdeka No.1",
    },
    {
      name: "Dr. Siti Marlina",
      email: "siti.marlina@email.com",
      photo: "https://i.pravatar.cc/100?img=2",
      spesialis: "Anak",
      status: "Aktif",
      telp: "082345678901",
      alamat: "Jl. Sudirman No.10",
    },
  ]);
  const [filteredDokters, setFilteredDokters] = useState<Dokter[]>(dokters);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newDoctor, setNewDoctor] = useState<Dokter>({
    name: "",
    email: "",
    photo: "",
    spesialis: "",
    status: "",
    telp: "",
    alamat: "",
  });

  const [time, setTime] = useState<string | null>(null);

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const closePopup = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement;
      // Close if click is outside the settings menu and not on the cog icon
      if (!tgt.closest(".settings-menu") && !tgt.closest(".settings-cog")) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", closePopup);
    return () => document.removeEventListener("mousedown", closePopup);
  }, []);

  useEffect(() => {
    setFilteredDokters(
      dokters.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, dokters]);

  /* -------------------- CRUD -------------------- */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setNewDoctor((p) => ({ ...p, photo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateDoctor = () => {
    const valid = Object.values(newDoctor).every((v) => v.trim() !== "");
    if (!valid) return alert("Semua kolom harus diisi.");

    if (editingIndex !== null) {
      const upd = [...dokters];
      upd[editingIndex] = newDoctor;
      setDokters(upd);
      setFilteredDokters(upd);
      setEditingIndex(null);
    } else {
      const upd = [...dokters, newDoctor];
      setDokters(upd);
      setFilteredDokters(upd);
    }
    setNewDoctor({
      name: "",
      email: "",
      photo: "",
      spesialis: "",
      status: "",
      telp: "",
      alamat: "",
    });
    setShowForm(false);
  };

  const handleEdit = (i: number) => {
    setNewDoctor(dokters[i]);
    setShowForm(true);
    setEditingIndex(i);
  };

  const handleDelete = (i: number) => {
    const upd = dokters.filter((_, idx) => idx !== i);
    setDokters(upd);
    setFilteredDokters(upd);
    if (editingIndex === i) {
      setShowForm(false);
      setEditingIndex(null);
    }
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-[#E6F0FF]"}`}>
      {/* SIDEBAR */}
      <aside
        className={`w-80 p-8 fixed h-full text-white flex flex-col justify-between ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-b from-[#4599D6] to-[#093362]"
        }`}
      >
        <div>
          <h2 className="text-4xl font-bold mb-70">Rekam Medis</h2>
          <ul className="space-y-6 text-xl">
            <li
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
            >
              <FaHome /> Dashboard
            </li>
            <li
              onClick={() => router.push("/kategori_obat")}
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
            >
              <FaListUl /> Kategori Obat
            </li>
            <li
              onClick={() => router.push("/data_obat")}
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
            >
              <FaPlus /> Data Obat
            </li>
            <li
              onClick={() => router.push("/data_pasien")}
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
            >
              <FaUserInjured /> Data Pasien
            </li>
            <li className="flex items-center gap-4 cursor-pointer text-3xl font-extrabold">
              <FaUserMd /> Data Dokter
            </li>
            <li
              onClick={() => router.push("/rekam_medis")}
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
            >
              <FaClipboardList /> Rekam Medis
            </li>
            <li
              onClick={() => router.push("/password")}
              className="flex items-center gap-4 cursor-pointer text-2xl font-bold"
            >
              <FaLock /> Profile
            </li>
          </ul>
        </div>
        <p className="text-lg">© 2025 Sabiru Development</p>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-12 ml-80">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className={`text-6xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Data Dokter</h1>

          <div className="flex items-center gap-6 relative">
            {time && <div className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-black"}`}>{time}</div>}
            <div className="relative">
              <FaCog
                className={`text-3xl cursor-pointer settings-cog ${darkMode ? "text-white" : "text-black"}`}
                onClick={() => setShowSettings(!showSettings)}
              />
              {showSettings && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg px-4 py-3 z-50 w-56 settings-menu">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium select-none">Dark Mode</span>
                    <Switch checked={darkMode} onChange={setDarkMode} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search + Button */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <div
            className={`flex items-center px-6 py-3 rounded-full shadow-md w-full max-w-xl ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <FiSearch
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-400"}`}
            />
            <input
              type="text"
              placeholder="Search"
              className={`ml-4 outline-none text-lg w-full ${
                darkMode ? "bg-gray-700 text-white" : ""
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setShowForm(true);
              setEditingIndex(null);
              setNewDoctor({
                name: "",
                email: "",
                photo: "",
                spesialis: "",
                status: "",
                telp: "",
                alamat: "",
              });
            }}
            className="bg-[#4599D6] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#357bb1]"
          >
            + Tambah Dokter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table
            className={`min-w-full text-white rounded-lg overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-[#4599D6]"
            }`}
          >
            <thead>
              <tr
                className={`text-left text-lg ${
                  darkMode ? "bg-gray-900" : "bg-[#093362]"
                }`}
              >
                <th className="px-6 py-4">Spesialis</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Telpon</th>
                <th className="px-6 py-4">Alamat</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDokters.map((d, i) => (
                <tr
                  key={i}
                  className="border-b border-white/20 hover:bg-[#387bb1] dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{d.spesialis}</td>
                  <td className="px-6 py-4">{d.name}</td>
                  <td className="px-6 py-4">{d.email}</td>
                  <td className="px-6 py-4">
                    <img src={d.photo} alt="Foto" className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4">{d.status}</td>
                  <td className="px-6 py-4">{d.telp}</td>
                  <td className="px-6 py-4">{d.alamat}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(i)}
                      className="text-yellow-300 hover:text-yellow-500"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-300 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Popup */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-[#1f2937] rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-4 text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                {editingIndex !== null ? "Edit Dokter" : "Tambah Dokter"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Spesialis"
                  className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  value={newDoctor.spesialis}
                  onChange={(e) => setNewDoctor({ ...newDoctor, spesialis: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nama"
                  className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  onChange={handlePhotoChange}
                />
                {newDoctor.photo && (
                  <img src={newDoctor.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                )}
                <input
                  type="text"
                  placeholder="Status"
                  className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  value={newDoctor.status}
                  onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Telp"
                  className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  value={newDoctor.telp}
                  onChange={(e) => setNewDoctor({ ...newDoctor, telp: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Alamat"
                  className="col-span-2 border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  value={newDoctor.alamat}
                  onChange={(e) => setNewDoctor({ ...newDoctor, alamat: e.target.value })}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddOrUpdateDoctor}
                  className="bg-[#093362] dark:bg-gray-900 text-white px-4 py-2 rounded"
                >
                  {editingIndex !== null ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}