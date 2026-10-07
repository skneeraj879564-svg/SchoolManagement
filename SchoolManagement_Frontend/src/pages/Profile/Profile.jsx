import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    currentEmail: user?.email || "",
    newEmail: user?.email || "",
    currentPassword: "",
    newPassword: "",
    newFullName: user?.fullName || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/Auth/change-account",
        formData
      );

      setMessage(
        response.data?.message ||
          "Account details changed successfully."
      );

      const updatedUser = {
        ...user,
        email: response.data.email,
        fullName: response.data.fullName,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setFormData({
        currentEmail: response.data.email,
        newEmail: response.data.email,
        currentPassword: "",
        newPassword: "",
        newFullName: response.data.fullName,
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to update account details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "25px" }}>
        <h1>My Profile</h1>

        <p style={{ color: "#6b7280" }}>
          Manage your account information
        </p>
      </div>

      {message && (
        <div
          style={{
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
            padding: "12px 15px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#842029",
            padding: "12px 15px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #007bff, #0056b3)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {(user?.fullName || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h2 style={{ margin: 0 }}>
              {user?.fullName || "User"}
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                color: "#6b7280",
              }}
            >
              {user?.role || "User"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>

          <input
            type="text"
            name="newFullName"
            value={formData.newFullName}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <label>Current Email</label>

          <input
            type="email"
            name="currentEmail"
            value={formData.currentEmail}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <label>New Email</label>

          <input
            type="email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <label>Current Password</label>

          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <label>New Password</label>

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "12px",
              fontSize: "15px",
            }}
          >
            {loading
              ? "Updating..."
              : "Update Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;