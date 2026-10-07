import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noticeService from "../../services/noticeService";
import Toast from "../../components/common/Toast";

const NoticeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishDate: "",
    expiryDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isEditMode) {
      loadNotice();
    }
  }, [id]);

  const loadNotice = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await noticeService.getNoticeById(id);

      setFormData({
        title: data.title ?? "",
        content: data.content ?? "",
        publishDate: data.publishDate
          ? data.publishDate.substring(0, 10)
          : "",
        expiryDate: data.expiryDate
          ? data.expiryDate.substring(0, 10)
          : "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load notice.";

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
        title: formData.title,
        content: formData.content,
        publishDate: formData.publishDate,
        expiryDate: formData.expiryDate,
      };

      if (isEditMode) {
        await noticeService.updateNotice(id, data);

        setToast({
          message: "Notice updated successfully.",
          type: "success",
        });
      } else {
        await noticeService.createNotice(data);

        setToast({
          message: "Notice added successfully.",
          type: "success",
        });
      }

      navigate("/notices");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save notice.";

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
    !formData.title
  ) {
    return <h2>Loading notice...</h2>;
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
        {isEditMode ? "Edit Notice" : "Add Notice"}
      </h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            required
          />
        </div>

        <br />

        <div>
          <label>Content</label>
          <br />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter notice content"
            rows="6"
            required
          />
        </div>

        <br />

        <div>
          <label>Publish Date</label>
          <br />

          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Expiry Date</label>
          <br />

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
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
            ? "Update Notice"
            : "Add Notice"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/notices")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;