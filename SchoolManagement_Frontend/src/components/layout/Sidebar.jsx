import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      roles: ["Admin", "Teacher", "Student"],
      icon: "🏠",
    },
    {
      name: "Students",
      path: "/students",
      roles: ["Admin", "Teacher"],
      icon: "👨‍🎓",
    },
    {
      name: "Teachers",
      path: "/teachers",
      roles: ["Admin"],
      icon: "👨‍🏫",
    },
    {
      name: "Classes",
      path: "/classes",
      roles: ["Admin"],
      icon: "🏫",
    },
    {
      name: "Subjects",
      path: "/subjects",
      roles: ["Admin"],
      icon: "📚",
    },
    {
      name: "Class Subjects",
      path: "/class-subjects",
      roles: ["Admin"],
      icon: "📖",
    },
    {
      name: "Attendance",
      path: "/attendance",
      roles: ["Admin", "Teacher", "Student"],
      icon: "📋",
    },
    {
      name: "Exams",
      path: "/exams",
      roles: ["Admin", "Teacher", "Student"],
      icon: "📝",
    },
    {
      name: "Marks",
      path: "/marks",
      roles: ["Admin", "Teacher", "Student"],
      icon: "📊",
    },
    {
      name: "Fees",
      path: "/fees",
      roles: ["Admin", "Student"],
      icon: "💰",
    },
    {
      name: "Notices",
      path: "/notices",
      roles: ["Admin", "Teacher", "Student"],
      icon: "📢",
    },
  ];

  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #111827 0%, #1f2937 100%)",
        color: "#fff",
        padding: "20px 14px",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "8px 10px 22px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "18px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          🏫 School Management
        </h2>

        <p
          style={{
            margin: "7px 0 0",
            color: "#9ca3af",
            fontSize: "12px",
          }}
        >
          Management Portal
        </p>
      </div>

      {/* User Role */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "8px",
          padding: "10px 12px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#d1d5db",
          }}
        >
          Logged in as
        </div>

        <div
          style={{
            marginTop: "3px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          {user?.fullName || "User"}
        </div>

        <div
          style={{
            marginTop: "2px",
            fontSize: "12px",
            color: "#60a5fa",
          }}
        >
          {user?.role || "User"}
        </div>
      </div>

      {/* Navigation */}
      <nav>
        {visibleMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: "11px 12px",
              marginBottom: "5px",
              borderRadius: "7px",
              textDecoration: "none",
              color: isActive ? "#fff" : "#d1d5db",
              backgroundColor: isActive
                ? "#007bff"
                : "transparent",
              fontWeight: isActive ? "600" : "400",
              fontSize: "14px",
              transition: "0.2s ease",
            })}
          >
            <span
              style={{
                width: "22px",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;