import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        boxSizing: "border-box",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "21px",
            color: "#1f2937",
            fontWeight: "600",
          }}
        >
          School Management System
        </h2>

        <span
          style={{
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          Administration Panel
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            textAlign: "right",
            lineHeight: "1.3",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            {user?.fullName || "User"}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            {user?.role || "User"}
          </div>
        </div>

        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #007bff, #0056b3)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {(user?.fullName || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/profile")}
          style={{
            backgroundColor: "#007bff",
            padding: "8px 14px",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        >
          Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc3545",
            padding: "8px 14px",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;