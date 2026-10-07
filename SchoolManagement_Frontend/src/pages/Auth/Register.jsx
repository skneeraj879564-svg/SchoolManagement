import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await register(
        formData.fullName,
        formData.email,
        formData.password
      );

      setSuccess(
        "Registration successful. Please login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed.";

      setError(message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #e8f0ff 0%, #f5f7fb 100%)",
        padding: "20px",
      }}
    >
      {/* Project Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#1f2937",
            fontWeight: "700",
          }}
        >
          School Management System
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#6b7280",
            fontSize: "15px",
          }}
        >
          Create your account to get started
        </p>
      </div>

      {/* Register Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "14px",
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.10)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginTop: 0,
            marginBottom: "8px",
            color: "#111827",
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: 0,
            marginBottom: "28px",
            fontSize: "14px",
          }}
        >
          Register as a student
        </p>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "10px 12px",
              borderRadius: "6px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#15803d",
              padding: "10px 12px",
              borderRadius: "6px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={{
                width: "100%",
                maxWidth: "none",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "7px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                maxWidth: "none",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "7px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              style={{
                width: "100%",
                maxWidth: "none",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "7px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "7px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Registering..."
              : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            marginBottom: 0,
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "25px",
          marginBottom: 0,
          color: "#9ca3af",
          fontSize: "13px",
        }}
      >
        © 2026 School Management System
      </p>
    </div>
  );
};

export default Register;