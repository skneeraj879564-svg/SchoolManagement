import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teacherService from "../../services/teacherService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const TeacherList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await teacherService.getTeachers(
          pageNumber,
          pageSize
        );

      setTeachers(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load teachers.";

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
    loadTeachers();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedTeacherId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await teacherService.deleteTeacher(
        selectedTeacherId
      );

      setShowConfirm(false);
      setSelectedTeacherId(null);

      setToast({
        message: "Teacher deleted successfully.",
        type: "success",
      });

      await loadTeachers();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete teacher.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedTeacherId(null);
  };

  const filteredTeachers = teachers.filter(
    (teacher) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        teacher.firstName
          ?.toLowerCase()
          .includes(searchText) ||
        teacher.lastName
          ?.toLowerCase()
          .includes(searchText) ||
        teacher.email
          ?.toLowerCase()
          .includes(searchText) ||
        teacher.phone
          ?.toLowerCase()
          .includes(searchText) ||
        teacher.subject
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  if (loading) {
    return <Loader text="Loading teachers..." />;
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
        <h1>Teachers</h1>

        {isAdmin && (
          <Link to="/teachers/add">
            <button>Add Teacher</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search teachers..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredTeachers.length === 0 ? (
        <p>No teachers found.</p>
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
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Joining Date</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>

                <td>
                  {teacher.firstName}{" "}
                  {teacher.lastName}
                </td>

                <td>{teacher.email}</td>

                <td>{teacher.phone}</td>

                <td>{teacher.subject}</td>

                <td>
                  {teacher.dateOfJoining
                    ? teacher.dateOfJoining.split("T")[0]
                    : ""}
                </td>

                <td>
                  {teacher.isActive
                    ? "Yes"
                    : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/teachers/edit/${teacher.id}`}
                    >
                      <button>Edit</button>
                    </Link>

                    <button
                      onClick={() =>
                        handleDeleteClick(teacher.id)
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
          teachers.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this teacher?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default TeacherList;