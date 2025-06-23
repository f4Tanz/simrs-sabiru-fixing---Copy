export default function Sidebar() {
    return (
      <aside className="w-80 bg-gradient-to-b from-[#4599D6] to-[#093362] text-white p-8 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Dashboard</a></li>
          <li><a href="#" className="hover:underline">Rekam Medis</a></li>
          <li><a href="#" className="hover:underline">Pengaturan</a></li>
        </ul>
      </aside>
    );
  }
  