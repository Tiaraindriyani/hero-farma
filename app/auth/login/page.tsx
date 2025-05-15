"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login berhasil!");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Email atau password salah!");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Kiri - Ilustrasi atau dekorasi */}
        <div className="hidden md:flex md:w-1/2 bg-[#24305E] text-white flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
          <p className="text-center text-sm text-gray-200 max-w-xs">
            Masuk ke dashboard admin untuk mengelola data dan konten aplikasi.
          </p>
        </div>

        {/* Kanan - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center text-[#374785] mb-6">
            Login Admin
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#374785] transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#374785] transition"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#374785] hover:bg-[#2c356d] text-white font-semibold rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
