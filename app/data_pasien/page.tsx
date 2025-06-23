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
  FaCog,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const initialPatients = [
  { name: "Ahmad Riyadi", age: 45, gender: "Laki-laki", condition: "Diabetes", nik: 12345 },
  { name: "Siti Aisyah", age: 32, gender: "Perempuan", condition: "Hipertensi", nik: 12345 },
  { name: "Budi Santoso", age: 27, gender: "Laki-laki", condition: "Sehat", nik: 12345 },
  { name: "Nurul Hidayah", age: 50, gender: "Perempuan", condition: "Asma", nik: 12345 },
  { name: "Rahmat Hidayat", age: 60, gender: "Laki-laki", condition: "Jantung", nik: 12345 },
];

export default function DataPasien() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState(initialPatients);
  const [filteredPatients, setFilteredPatients] = useState(initialPatients);
  const [time, setTime] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    nik: "",
  });

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, patients]);

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

  const handleAddPatient = () => {
    setPatients([...patients, { ...newPatient, age: parseInt(newPatient.age), nik: parseInt(newPatient.nik) }]);
    setNewPatient({ name: "", age: "", gender: "", condition: "", nik: "" });
    setShowModal(false);
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
            <li onClick={() => router.push("/dashboard")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaHome /> Dashboard</li>
            <li onClick={() => router.push("/kategori_obat")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaListUl /> Kategori Obat</li>
            <li onClick={() => router.push("/data_obat")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaPlus /> Data Obat</li>
            <li className="flex items-center gap-4 cursor-pointer text-3xl font-extrabold"><FaUserInjured /> Data Pasien</li>
            <li onClick={() => router.push("/data_dokter")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaUserMd /> Data Dokter</li>
            <li onClick={() => router.push("/rekam_medis")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaClipboardList /> Rekam Medis</li>
            <li onClick={() => router.push("/password")} className="flex items-center gap-4 cursor-pointer text-2xl font-bold"><FaLock /> Profile</li>
          </ul>
        </div>
        <p className="text-lg">© 2025 Sabiru Development</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 ml-80">
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="text-6xl font-bold">Data Pasien</h1>
          <div className="flex items-center gap-8">
            {time && <div className="text-2xl font-semibold">{time}</div>}
            <div className={`flex items-center px-6 py-3 rounded-full shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <FiSearch className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search"
                className={`ml-4 outline-none text-lg w-full ${darkMode ? "bg-gray-800 text-white" : "text-black"}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
              <div className="relative">
              <FaCog onClick={() => setShowSettings(!showSettings)} className="text-3xl cursor-pointer" />
              {showSettings && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 border rounded-xl shadow-xl z-50 p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-black dark:text-white">Dark Mode</span>
                    <div
                      onClick={toggleDarkMode}
                      className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors duration-300 ${darkMode ? 'justify-end' : 'justify-start'}`}>
                      <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Tambah Pasien */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
        >
          + Tambah Pasien
        </button>

        {/* Tabel Pasien */}
        <div className="overflow-x-auto">
          <table className={`min-w-full text-white rounded-lg overflow-hidden ${
            darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-[#4599D6] to-[#093362]"
          }`}>
            <thead>
              <tr className="text-left text-lg bg-[#093362]">
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Umur</th>
                <th className="px-6 py-4">Jenis Kelamin</th>
                <th className="px-6 py-4">Kondisi</th>
                <th className="px-6 py-4">NIK</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index} className="border-b border-white/20 hover:bg-[#387bb1] transition-all">
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{patient.gender}</td>
                  <td className="px-6 py-4">{patient.condition}</td>
                  <td className="px-6 py-4">{patient.nik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Tambah Pasien */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`bg-white p-8 rounded-xl w-full max-w-md z-50`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Tambah Pasien</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nama" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="w-full p-2 border rounded" />
              <input type="number" placeholder="Umur" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} className="w-full p-2 border rounded" />
              <select value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} className="w-full p-2 border rounded">
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <input type="text" placeholder="Kondisi" value={newPatient.condition} onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })} className="w-full p-2 border rounded" />
              <input type="number" placeholder="NIK" value={newPatient.nik} onChange={(e) => setNewPatient({ ...newPatient, nik: e.target.value })} className="w-full p-2 border rounded" />
              <button onClick={handleAddPatient} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
