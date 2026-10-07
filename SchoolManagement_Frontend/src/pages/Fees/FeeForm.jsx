import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import feeService from "../../services/feeService";
import Toast from "../../components/common/Toast";

const FeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    dueDate: "",
    paidDate: "",
    status: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isEditMode) {
      loadFee();
    }
  }, [id]);

  const loadFee = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await feeService.getFeeById(id);

      setFormData({
        studentId: data.studentId ?? "",
        amount: data.amount ?? "",
        dueDate: data.dueDate
          ? data.dueDate.substring(0, 10)
          : "",
        paidDate: data.paidDate
          ? data.paidDate.substring(0, 10)
          : "",
        status: data.status ?? "",
        remarks: data.remarks ?? "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load fee.";

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
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        paidDate:
          formData.paidDate === ""
            ? null
            : formData.paidDate,
        status: formData.status,
        remarks: formData.remarks,
      };

      if (isEditMode) {
        await feeService.updateFee(id, data);

        setToast({
          message: "Fee updated successfully.",
          type: "success",
        });
      } else {
        await feeService.createFee(data);

        setToast({
          message: "Fee added successfully.",
          type: "success",
        });
      }

      navigate("/fees");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save fee.";

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
    return <h2>Loading fee...</h2>;
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
        {isEditMode ? "Edit Fee" : "Add Fee"}
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
          <label>Amount</label>
          <br />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>Due Date</label>
          <br />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Paid Date</label>
          <br />

          <input
            type="date"
            name="paidDate"
            value={formData.paidDate}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Status</label>
          <br />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Status
            </option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
          </select>
        </div>

        <br />

        <div>
          <label>Remarks</label>
          <br />

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Optional"
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
            ? "Update Fee"
            : "Add Fee"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/fees")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FeeForm;