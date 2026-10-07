import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import examService from "../../services/examService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const ExamList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [exams, setExams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedExamId, setSelectedExamId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadExams = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await examService.getExams(
        pageNumber,
        pageSize
      );

      setExams(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load exams.";

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
    loadExams();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedExamId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await examService.deleteExam(
        selectedExamId
      );

      setShowConfirm(false);
      setSelectedExamId(null);

      setToast({
        message: "Exam deleted successfully.",
        type: "success",
      });

      await loadExams();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete exam.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedExamId(null);
  };

  // SEARCH
  const filteredExams = exams.filter((item) => {
    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    const examDate = item.examDate
      ? new Date(item.examDate)
          .toLocaleDateString()
          .toLowerCase()
      : "";

    return (
      item.name
        ?.toLowerCase()
        .includes(searchText) ||
      item.classId
        ?.toString()
        .includes(searchText) ||
      examDate.includes(searchText) ||
      item.description
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return <Loader text="Loading exams..." />;
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
        <h1>Exams</h1>

        {isAdmin && (
          <Link to="/exams/add">
            <button>Add Exam</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search exams..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredExams.length === 0 ? (
        <p>No exams found.</p>
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
              <th>Name</th>
              <th>Class ID</th>
              <th>Exam Date</th>
              <th>Description</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredExams.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>{item.classId}</td>

                <td>
                  {item.examDate
                    ? new Date(
                        item.examDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {item.description || "-"}
                </td>

                <td>
                  {item.isActive
                    ? "Yes"
                    : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/exams/edit/${item.id}`}
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
          exams.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this exam?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default ExamList;