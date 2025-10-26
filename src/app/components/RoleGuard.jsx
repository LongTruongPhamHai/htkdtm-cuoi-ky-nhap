"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RoleGuard({ children, role }) {
  // const router = useRouter();
  // const pathname = usePathname();
  // useEffect(() => {
  //   // 🧠 Lấy thông tin role và name đã lưu sau khi đăng nhập
  //   const currentRole = localStorage.getItem("role");
  //   const name = localStorage.getItem("name");
  //   // Nếu chưa đăng nhập hoặc sai vai trò → chuyển hướng đúng trang login
  //   if (!currentRole || currentRole !== role || !name) {
  //     if (role === "teacher") {
  //       router.push("/teacher");
  //     } else if (role === "student") {
  //       router.push("/students/login");
  //     }
  //     return;
  //   }
  //   // Nếu người dùng cố vào nhầm trang login dù đã đăng nhập thì điều hướng lại
  //   if (role === "teacher" && pathname === "/teacher") {
  //     router.push("/teacher/home");
  //   } else if (
  //     role === "student" &&
  //     pathname === "/students/login"
  //   ) {
  //     router.push("/");
  //   }
  // }, [router, pathname, role]);
  // return <>{children}</>;
}
