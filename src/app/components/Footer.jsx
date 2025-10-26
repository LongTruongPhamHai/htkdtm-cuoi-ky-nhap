export default function Footer() {
  return (
    <footer
      className="text-center py-6 border-t"
      style={{
        backgroundColor: "var(--edu-surface)",
        borderColor: "var(--edu-border)",
        color: "var(--edu-text)",
      }}
    >
      <p className="text-sm">
        © {new Date().getFullYear()} Smart Classroom —
        <span className="text-[var(--edu-primary)] font-medium ml-1">
          Hệ thống Quản lý Lớp học Thông minh
        </span>
      </p>
      <p
        className="text-xs mt-1"
        style={{ color: "var(--edu-text-light)" }}
      >
        Designed with 💙 for education and innovation.
      </p>
    </footer>
  );
}
