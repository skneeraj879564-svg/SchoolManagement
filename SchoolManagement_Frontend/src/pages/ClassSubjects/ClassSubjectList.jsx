import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classSubjectService from "../../services/classSubjectService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const ClassSubjectList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [classSubjects, setClassSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedClassSubjectId, setSelectedClassSubjectId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadClassSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await classSubjectService.getClassSubjects(
          pageNumber,
          pageSize
        );

      setClassSubjects(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load class subjects.";

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
    loadClassSubjects();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedClassSubjectId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await classSubjectService.deleteClassSubject(
        selectedClassSubjectId
      );

      setShowConfirm(false);
      setSelectedClassSubjectId(null);

      setToast({
        message: "Class subject deleted successfully.",
        type: "success",
      });

      await loadClassSubjects();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete class subject.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedClassSubjectId(null);
  };

  // SEARCH
  const filteredClassSubjects = classSubjects.filter(
    (item) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        item.classId
          ?.toString()
          .includes(searchText) ||
        item.subjectId
          ?.toString()
          .includes(searchText) ||
        item.teacherId
          ?.toString()
          .includes(searchText)
      );
    }
  );

  if (loading) {
    return (
      <Loader text="Loading class subjects..." />
    );
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
        <h1>Class Subjects</h1>

        {isAdmin && (
          <Link to="/class-subjects/add">
            <button>Add Class Subject</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search class subjects..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredClassSubjects.length === 0 ? (
        <p>No class subjects found.</p>
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
              <th>Class ID</th>
              <th>Subject ID</th>
              <th>Teacher ID</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredClassSubjects.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.classId}</td>
                <td>{item.subjectId}</td>

                <td>
                  {item.teacherId ??
                    "Not Assigned"}
                </td>

                <td>
                  {item.isActive
                    ? "Yes"
                    : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/class-subjects/edit/${item.id}`}
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
          classSubjects.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this class subject?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default ClassSubjectList;