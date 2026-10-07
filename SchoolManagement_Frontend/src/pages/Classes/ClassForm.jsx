import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classService from "../../services/classService";
import Toast from "../../components/common/Toast";

const ClassForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    roomNumber: "",
    capacity: "",
    classTeacherId: "",
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
      loadClass();
    }
  }, [id]);

  const loadClass = async () => {
    try {
      setLoading(true);
      setError("");

      const classData =
        await classService.getClassById(id);

      setFormData({
        name: classData.name || "",
        section: classData.section || "",
        roomNumber: classData.roomNumber || "",
        capacity:
          classData.capacity !== null &&
          classData.capacity !== undefined
            ? classData.capacity
            : "",
        classTeacherId:
          classData.classTeacherId ?? "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load class.";

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

      const data = {
        name: formData.name,
        section: formData.section,
        roomNumber: formData.roomNumber,
        capacity: Number(formData.capacity),
        classTeacherId:
          formData.classTeacherId === ""
            ? null
            : Number(formData.classTeacherId),
      };

      if (isEditMode) {
        await classService.updateClass(id, data);

        setToast({
          message: "Class updated successfully.",
          type: "success",
        });
      } else {
        await classService.createClass(data);

        setToast({
          message: "Class added successfully.",
          type: "success",
        });
      }

      navigate("/classes");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save class.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !formData.name) {
    return <h2>Loading class...</h2>;
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
        {isEditMode ? "Edit Class" : "Add Class"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Class 10"
            required
          />
        </div>

        <br />

        <div>
          <label>Section</label>
          <br />
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="e.g. A"
            required
          />
        </div>

        <br />

        <div>
          <label>Room Number</label>
          <br />
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="e.g. 101"
            required
          />
        </div>

        <br />

        <div>
          <label>Capacity</label>
          <br />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Class Teacher ID</label>
          <br />
          <input
            type="number"
            name="classTeacherId"
            value={formData.classTeacherId}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Class"
            : "Add Class"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/classes")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ClassForm;