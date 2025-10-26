"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      router.replace("/");
      return;
    }

    if (role === "teacher") {
      router.replace("/teacher");
    } else if (role === "student") {
      router.replace("/students");
    } else {
      localStorage.removeItem("role");
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">
        Đang chuyển trang...
      </p>
    </div>
  );
}
