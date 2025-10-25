"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "student", // 👈 Đăng nhập sinh viên
          username,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Đăng nhập thất bại");

      // ✅ Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", "student");
      window.dispatchEvent(new Event("roleChanged"));

      router.push("/students/home"); // ✅ Chuyển đến trang sinh viên
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-100"
      >
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          🎒 Đăng nhập Sinh viên
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <button
          type="button"
          disabled={loading}
          className="w-full py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition mt-2"
          onClick={() => router.push("/")}
        >
          Quay lại
        </button>
      </form>
    </div>
  );
}
