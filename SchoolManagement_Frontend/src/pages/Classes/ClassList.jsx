import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classService from "../../services/classService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const ClassList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedClassId, setSelectedClassId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await classService.getClasses(
        pageNumber,
        pageSize
      );

      setClasses(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load classes.";

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
    loadClasses();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedClassId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await classService.deleteClass(
        selectedClassId
      );

      setShowConfirm(false);
      setSelectedClassId(null);

      setToast({
        message: "Class deleted successfully.",
        type: "success",
      });

      await loadClasses();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete class.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedClassId(null);
  };

  // SEARCH
  const filteredClasses = classes.filter((item) => {
    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      item.name
        ?.toLowerCase()
        .includes(searchText) ||
      item.section
        ?.toLowerCase()
        .includes(searchText) ||
      item.roomNumber
        ?.toString()
        .toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return <Loader text="Loading classes..." />;
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
        <h1>Classes</h1>

        {isAdmin && (
          <Link to="/classes/add">
            <button>Add Class</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search classes..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredClasses.length === 0 ? (
        <p>No classes found.</p>
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
              <th>Section</th>
              <th>Room Number</th>
              <th>Capacity</th>
              <th>Class Teacher ID</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredClasses.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.section}</td>
                <td>{item.roomNumber}</td>
                <td>{item.capacity}</td>

                <td>
                  {item.classTeacherId ??
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
                      to={`/classes/edit/${item.id}`}
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
          classes.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this class?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default ClassList;