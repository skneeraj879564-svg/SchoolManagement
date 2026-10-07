import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import markService from "../../services/markService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const MarkList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [marks, setMarks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMarkId, setSelectedMarkId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadMarks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await markService.getMarks(
        pageNumber,
        pageSize
      );

      setMarks(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load marks.";

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
    loadMarks();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedMarkId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await markService.deleteMark(
        selectedMarkId
      );

      setShowConfirm(false);
      setSelectedMarkId(null);

      setToast({
        message: "Mark deleted successfully.",
        type: "success",
      });

      await loadMarks();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete mark.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedMarkId(null);
  };

  // SEARCH
  const filteredMarks = marks.filter((item) => {
    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      item.studentId
        ?.toString()
        .includes(searchText) ||
      item.examId
        ?.toString()
        .includes(searchText) ||
      item.subjectId
        ?.toString()
        .includes(searchText) ||
      item.marksObtained
        ?.toString()
        .includes(searchText) ||
      item.maxMarks
        ?.toString()
        .includes(searchText) ||
      item.grade
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return <Loader text="Loading marks..." />;
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
        <h1>Marks</h1>

        {isAdmin && (
          <Link to="/marks/add">
            <button>Add Mark</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search marks..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredMarks.length === 0 ? (
        <p>No marks found.</p>
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
              <th>Exam ID</th>
              <th>Subject ID</th>
              <th>Marks Obtained</th>
              <th>Max Marks</th>
              <th>Grade</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredMarks.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.studentId}</td>
                <td>{item.examId}</td>
                <td>{item.subjectId}</td>
                <td>{item.marksObtained}</td>
                <td>{item.maxMarks}</td>
                <td>{item.grade}</td>

                <td>
                  {item.isActive ? "Yes" : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/marks/edit/${item.id}`}
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
          marks.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this mark?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default MarkList;