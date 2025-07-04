'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Logika autentikasi bisa ditambahkan di sini
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 font-poppins">
      <div className="flex w-full h-full bg-white shadow-lg overflow-hidden relative">
        {/* Left Side */}
        <div className="w-[35%] h-full bg-gradient-to-b from-[#4599D6] to-[#093362] p-16 text-white flex flex-col items-center justify-start">
          <h2 className="text-5xl font-semibold text-center mb-6 mt-4">Selamat Datang!</h2>
          <p className="text-xl text-center leading-relaxed">
            Silahkan login terlebih dahulu. Jika tidak memiliki akun, silakan daftar.
          </p>
        </div>

        {/* Centered Image Between Sections */}
        <div className="absolute left-[28%] top-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <Image src="/images/buat-sabiru.svg" alt="Illustration" width={1000} height={1000} />
        </div>

        {/* Right Side */}
        <div className="w-[65%] h-full flex justify-center items-center p-16 relative z-10">
          <div className="w-[90%] max-w-[500px] text-center">
            <h2 className="text-5xl font-bold text-[#093362] mb-8">Masuk</h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4599D6]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4599D6]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                className="w-full bg-[#4599D6] text-white py-4 font-semibold text-lg hover:bg-[#377cbf] transition"
                onClick={handleLogin}
              >
                Masuk
              </button>
              <p className="text-right text-sm text-[#4599D6] cursor-pointer hover:underline">
                Lupa Password?
              </p>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-500">Atau masuk dengan</p>
              <button className="w-full border border-gray-300 py-3 mt-4 flex items-center justify-center space-x-2">
                <img src="/images/google-icon.svg" alt="Google" className="w-5 h-5" />
                <span>Masuk dengan Google</span>
              </button>
              <button className="w-full border border-gray-300 py-3 mt-2 flex items-center justify-center space-x-2">
                <img src="/images/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
                <span>Masuk dengan Facebook</span>
              </button>
            </div>
            <p className="text-center text-gray-600 mt-8">
            Belum punya akun?{' '}
            <a href="/register" className="text-[#4599D6] cursor-pointer hover:underline">
              Daftar
            </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
