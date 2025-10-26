import { useEffect, useState } from "react";

export default function RoleGuard({ children, role }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return; // chỉ chạy khi đã mount client

    const currentRole = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    if (!currentRole || currentRole !== role || !name) {
      router.push(
        role === "teacher"
          ? "/teacher/login"
          : "/students/login"
      );
      return;
    }

    if (
      role === "teacher" &&
      pathname === "/teacher/login"
    ) {
      router.push("/teacher/home");
    } else if (
      role === "student" &&
      pathname === "/students/login"
    ) {
      router.push("/students/home");
    }
  }, [mounted, router, pathname, role]);

  return <>{children}</>;
}
