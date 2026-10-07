import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import markService from "../../services/markService";
import Toast from "../../components/common/Toast";

const MarkForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    studentId: "",
    examId: "",
    subjectId: "",
    marksObtained: "",
    maxMarks: "",
    grade: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isEditMode) {
      loadMark();
    }
  }, [id]);

  const loadMark = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await markService.getMarkById(id);

      setFormData({
        studentId: data.studentId ?? "",
        examId: data.examId ?? "",
        subjectId: data.subjectId ?? "",
        marksObtained: data.marksObtained ?? "",
        maxMarks: data.maxMarks ?? "",
        grade: data.grade ?? "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load mark.";

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
        studentId: Number(formData.studentId),
        examId: Number(formData.examId),
        subjectId: Number(formData.subjectId),
        marksObtained: Number(
          formData.marksObtained
        ),
        maxMarks: Number(formData.maxMarks),
        grade: formData.grade,
      };

      if (isEditMode) {
        await markService.updateMark(id, data);

        setToast({
          message: "Mark updated successfully.",
          type: "success",
        });
      } else {
        await markService.createMark(data);

        setToast({
          message: "Mark added successfully.",
          type: "success",
        });
      }

      navigate("/marks");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save mark.";

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
    !formData.studentId
  ) {
    return <h2>Loading mark...</h2>;
  }

  return (
    <div>
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
        {isEditMode ? "Edit Mark" : "Add Mark"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID</label>
          <br />

          <input
            type="number"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Exam ID</label>
          <br />

          <input
            type="number"
            name="examId"
            value={formData.examId}
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
          <label>Marks Obtained</label>
          <br />

          <input
            type="number"
            name="marksObtained"
            value={formData.marksObtained}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>Max Marks</label>
          <br />

          <input
            type="number"
            name="maxMarks"
            value={formData.maxMarks}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>Grade</label>
          <br />

          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. A"
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
            ? "Update Mark"
            : "Add Mark"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/marks")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MarkForm;