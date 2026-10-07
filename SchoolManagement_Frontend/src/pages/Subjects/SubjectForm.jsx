import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import subjectService from "../../services/subjectService";
import Toast from "../../components/common/Toast";

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
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
      loadSubject();
    }
  }, [id]);

  const loadSubject = async () => {
    try {
      setLoading(true);
      setError("");

      const subject =
        await subjectService.getSubjectById(id);

      setFormData({
        name: subject.name || "",
        code: subject.code || "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load subject.";

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
        await subjectService.updateSubject(
          id,
          formData
        );

        setToast({
          message: "Subject updated successfully.",
          type: "success",
        });
      } else {
        await subjectService.createSubject(formData);

        setToast({
          message: "Subject added successfully.",
          type: "success",
        });
      }

      navigate("/subjects");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save subject.";

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
    return <h2>Loading subject...</h2>;
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
        {isEditMode ? "Edit Subject" : "Add Subject"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Mathematics"
            required
          />
        </div>

        <br />

        <div>
          <label>Subject Code</label>
          <br />
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. MATH101"
            required
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Subject"
            : "Add Subject"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/subjects")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SubjectForm;