import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import attendanceService from "../../services/attendanceService";
import Toast from "../../components/common/Toast";

const AttendanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    studentId: "",
    attendanceDate: "",
    status: "",
    remarks: "",
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
      loadAttendance();
    }
  }, [id]);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await attendanceService.getAttendanceById(id);

      setFormData({
        studentId: data.studentId ?? "",
        attendanceDate: data.attendanceDate
          ? data.attendanceDate.substring(0, 10)
          : "",
        status: data.status ?? "",
        remarks: data.remarks ?? "",
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load attendance.";

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
        attendanceDate: formData.attendanceDate,
        status: formData.status,
        remarks: formData.remarks,
      };

      if (isEditMode) {
        await attendanceService.updateAttendance(
          id,
          data
        );

        setToast({
          message:
            "Attendance updated successfully.",
          type: "success",
        });
      } else {
        await attendanceService.createAttendance(
          data
        );

        setToast({
          message:
            "Attendance added successfully.",
          type: "success",
        });
      }

      navigate("/attendance");
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to save attendance.";

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
    return <h2>Loading attendance...</h2>;
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
          ? "Edit Attendance"
          : "Add Attendance"}
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
          <label>Attendance Date</label>
          <br />

          <input
            type="date"
            name="attendanceDate"
            value={formData.attendanceDate}
            onChange={handleChange}
            required
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

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Late">
              Late
            </option>
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

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Attendance"
            : "Add Attendance"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/attendance")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;