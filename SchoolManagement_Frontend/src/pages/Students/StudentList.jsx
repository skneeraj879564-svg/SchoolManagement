import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import studentService from "../../services/studentService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const StudentList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await studentService.getStudents(
          pageNumber,
          pageSize
        );

      setStudents(response.data || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load students."
      );

      setToast({
        message: "Failed to load students.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedStudentId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await studentService.deleteStudent(
        selectedStudentId
      );

      setShowConfirm(false);
      setSelectedStudentId(null);

      setToast({
        message: "Student deleted successfully.",
        type: "success",
      });

      await loadStudents();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to delete student."
      );

      setToast({
        message: "Failed to delete student.",
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedStudentId(null);
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      student.firstName
        ?.toLowerCase()
        .includes(searchText) ||
      student.lastName
        ?.toLowerCase()
        .includes(searchText) ||
      student.email
        ?.toLowerCase()
        .includes(searchText) ||
      student.phone
        ?.toLowerCase()
        .includes(searchText) ||
      student.admissionNumber
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return <Loader text="Loading students..." />;
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
        <h1>Students</h1>

        {isAdmin && (
          <Link to="/students/add">
            <button>Add Student</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search students..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Admission Number</th>
              <th>Class ID</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.admissionNumber}</td>
                <td>{student.classId}</td>

                <td>
                  {student.isActive
                    ? "Yes"
                    : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/students/edit/${student.id}`}
                    >
                      <button>Edit</button>
                    </Link>

                    <button
                      onClick={() =>
                        handleDeleteClick(student.id)
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
          students.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this student?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default StudentList;