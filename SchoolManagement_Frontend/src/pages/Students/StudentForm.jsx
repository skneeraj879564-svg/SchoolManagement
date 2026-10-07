import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import studentService from "../../services/studentService";
import Toast from "../../components/common/Toast";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    admissionNumber: "",
    classId: "",
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
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      setError("");

      const student =
        await studentService.getStudentById(id);

      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        gender: student.gender || "",
        email: student.email || "",
        phone: student.phone || "",
        address: student.address || "",
        admissionNumber:
          student.admissionNumber || "",
        classId: student.classId || "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load student."
      );

      setToast({
        message: "Failed to load student.",
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

      const data = {
        ...formData,
        classId: Number(formData.classId),
      };

      if (isEditMode) {
        await studentService.updateStudent(id, data);

        setToast({
          message: "Student updated successfully.",
          type: "success",
        });
      } else {
        await studentService.createStudent(data);

        setToast({
          message: "Student added successfully.",
          type: "success",
        });
      }

      navigate("/students");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save student.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !formData.firstName) {
    return <h2>Loading student...</h2>;
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
          ? "Edit Student"
          : "Add Student"}
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
          <label>Date of Birth</label>
          <br />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Gender</label>
          <br />

          <input
            type="text"
            name="gender"
            value={formData.gender}
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
          <label>Admission Number</label>
          <br />

          <input
            type="text"
            name="admissionNumber"
            value={formData.admissionNumber}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Class ID</label>
          <br />

          <input
            type="number"
            name="classId"
            value={formData.classId}
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
            ? "Update Student"
            : "Add Student"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/students")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );
};

export default StudentForm;