import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classSubjectService from "../../services/classSubjectService";
import Toast from "../../components/common/Toast";

const ClassSubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    classId: "",
    subjectId: "",
    teacherId: "",
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
      loadClassSubject();
    }
  }, [id]);

  const loadClassSubject = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await classSubjectService.getClassSubjectById(id);

      setFormData({
        classId: data.classId ?? "",
        subjectId: data.subjectId ?? "",
        teacherId: data.teacherId ?? "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load class subject.";

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
        classId: Number(formData.classId),
        subjectId: Number(formData.subjectId),
        teacherId:
          formData.teacherId === ""
            ? null
            : Number(formData.teacherId),
      };

      if (isEditMode) {
        await classSubjectService.updateClassSubject(
          id,
          data
        );

        setToast({
          message:
            "Class subject updated successfully.",
          type: "success",
        });
      } else {
        await classSubjectService.createClassSubject(
          data
        );

        setToast({
          message:
            "Class subject added successfully.",
          type: "success",
        });
      }

      navigate("/class-subjects");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save class subject.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !formData.classId) {
    return <h2>Loading class subject...</h2>;
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
          ? "Edit Class Subject"
          : "Add Class Subject"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Class ID</label>
          <br />
          <input
            type="number"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Subject ID</label>
          <br />
          <input
            type="number"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Teacher ID</label>
          <br />
          <input
            type="number"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            min="1"
            placeholder="Optional"
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Class Subject"
            : "Add Class Subject"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/class-subjects")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ClassSubjectForm;