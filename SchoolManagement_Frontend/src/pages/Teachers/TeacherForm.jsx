import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import teacherService from "../../services/teacherService";
import Toast from "../../components/common/Toast";

const TeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    dateOfJoining: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isEditMode) {
      loadTeacher();
    }
  }, [id]);

  const loadTeacher = async () => {
    try {
      setLoading(true);
      setError("");

      const teacher =
        await teacherService.getTeacherById(id);

      setFormData({
        firstName: teacher.firstName || "",
        lastName: teacher.lastName || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        address: teacher.address || "",
        subject: teacher.subject || "",
        dateOfJoining: teacher.dateOfJoining
          ? teacher.dateOfJoining.split("T")[0]
          : "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load teacher.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (isEditMode) {
        await teacherService.updateTeacher(
          id,
          formData
        );

        setToast({
          message: "Teacher updated successfully.",
          type: "success",
        });
      } else {
        await teacherService.createTeacher(
          formData
        );

        setToast({
          message: "Teacher added successfully.",
          type: "success",
        });
      }

      navigate("/teachers");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save teacher.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (
    loading &&
    isEditMode &&
    !formData.firstName
  ) {
    return <h2>Loading teacher...</h2>;
  }

  return (
    <div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />

      <h1>
        {isEditMode
          ? "Edit Teacher"
          : "Add Teacher"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>First Name</label>
          <br />

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Last Name</label>
          <br />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Address</label>
          <br />

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Subject</label>
          <br />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Date of Joining</label>
          <br />

          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Teacher"
            : "Add Teacher"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/teachers")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );
};

export default TeacherForm;