import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import attendanceService from "../../services/attendanceService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const AttendanceList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [attendances, setAttendances] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadAttendances = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await attendanceService.getAttendances(
          pageNumber,
          pageSize
        );

      setAttendances(response.data || []);
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

  useEffect(() => {
    loadAttendances();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedAttendanceId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await attendanceService.deleteAttendance(
        selectedAttendanceId
      );

      setShowConfirm(false);
      setSelectedAttendanceId(null);

      setToast({
        message: "Attendance deleted successfully.",
        type: "success",
      });

      await loadAttendances();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete attendance.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedAttendanceId(null);
  };

  // SEARCH
  const filteredAttendances = attendances.filter(
    (item) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      const attendanceDate =
        item.attendanceDate
          ? new Date(
              item.attendanceDate
            )
              .toLocaleDateString()
              .toLowerCase()
          : "";

      return (
        item.studentId
          ?.toString()
          .includes(searchText) ||
        item.status
          ?.toLowerCase()
          .includes(searchText) ||
        item.remarks
          ?.toLowerCase()
          .includes(searchText) ||
        attendanceDate.includes(searchText)
      );
    }
  );

  if (loading) {
    return <Loader text="Loading attendance..." />;
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <h1>Attendance</h1>

        {isAdmin && (
          <Link to="/attendance/add">
            <button>Add Attendance</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search attendance..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredAttendances.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredAttendances.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.studentId}</td>

                <td>
                  {item.attendanceDate
                    ? new Date(
                        item.attendanceDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>{item.status}</td>

                <td>{item.remarks || "-"}</td>

                <td>
                  {item.isActive
                    ? "Yes"
                    : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/attendance/edit/${item.id}`}
                    >
                      <button>Edit</button>
                    </Link>

                    <button
                      onClick={() =>
                        handleDeleteClick(item.id)
                      }
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        pageNumber={pageNumber}
        onPrevious={() =>
          setPageNumber((page) =>
            Math.max(1, page - 1)
          )
        }
        onNext={() =>
          setPageNumber((page) => page + 1)
        }
        hasNextPage={
          attendances.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this attendance?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default AttendanceList;