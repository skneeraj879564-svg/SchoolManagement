import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import examService from "../../services/examService";
import Toast from "../../components/common/Toast";

const ExamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    examDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isEditMode) {
      loadExam();
    }
  }, [id]);

  const loadExam = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await examService.getExamById(id);

      setFormData({
        name: data.name ?? "",
        classId: data.classId ?? "",
        examDate: data.examDate
          ? data.examDate.substring(0, 10)
          : "",
        description: data.description ?? "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load exam.";

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
        classId: Number(formData.classId),
        examDate: formData.examDate,
        description: formData.description,
      };

      if (isEditMode) {
        await examService.updateExam(id, data);

        setToast({
          message: "Exam updated successfully.",
          type: "success",
        });
      } else {
        await examService.createExam(data);

        setToast({
          message: "Exam added successfully.",
          type: "success",
        });
      }

      navigate("/exams");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save exam.";

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
    return <h2>Loading exam...</h2>;
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
        {isEditMode ? "Edit Exam" : "Add Exam"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Exam Name</label>
          <br />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Half Yearly Exam"
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
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Exam Date</label>
          <br />

          <input
            type="date"
            name="examDate"
            value={formData.examDate}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter exam description"
            rows="4"
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
            ? "Update Exam"
            : "Add Exam"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/exams")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ExamForm;