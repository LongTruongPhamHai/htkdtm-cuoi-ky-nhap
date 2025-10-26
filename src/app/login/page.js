"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Lấy role từ localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) router.replace("/");
    else setRole(storedRole);
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, username, password }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Đăng nhập thất bại");

      // ✅ Lưu thông tin
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", data.role);
      window.dispatchEvent(new Event("roleChanged"));

      router.push("/");
      // ✅ Chuyển hướng đúng dashboard
      // if (role === "teacher") router.push("/teacher");
      // else router.push("/students");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!role)
    return <p className="text-center mt-20">Đang tải...</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, var(--edu-bg), var(--edu-surface))`,
      }}
    >
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="shadow-xl rounded-2xl p-8 w-full max-w-md border"
        style={{
          backgroundColor: "var(--edu-surface)",
          borderColor: "var(--edu-border)",
          color: "var(--edu-text)",
        }}
      >
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{
            color:
              role === "teacher"
                ? "var(--edu-teacher)"
                : "var(--edu-student)",
          }}
        >
          {role === "teacher"
            ? "👩‍🏫 Đăng nhập Giảng viên"
            : "🎓 Đăng nhập Sinh viên"}
        </h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg p-3 outline-none transition"
            style={{
              border: `1px solid var(--edu-border)`,
              backgroundColor: "var(--edu-bg)",
              color: "var(--edu-text)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
            }}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg p-3 outline-none transition"
            style={{
              border: `1px solid var(--edu-border)`,
              backgroundColor: "var(--edu-bg)",
              color: "var(--edu-text)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
            }}
            required
          />
        </div>

        {error && (
          <p
            className="text-center mb-4"
            style={{ color: "crimson" }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-semibold transition"
          style={{
            backgroundColor: "var(--edu-primary)",
            color: "white",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("role");
            router.push("/");
          }}
          className="w-full mt-3 py-2 rounded-lg font-semibold bg-gray-400 hover:bg-gray-500 transition"
          style={{
            color: "white",
          }}
        >
          Quay lại
        </button>
      </motion.form>
    </div>
  );
}
