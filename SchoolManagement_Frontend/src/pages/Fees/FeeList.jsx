import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import feeService from "../../services/feeService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const FeeList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFeeId, setSelectedFeeId] =
    useState(null);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await feeService.getFees(
        pageNumber,
        pageSize
      );

      setFees(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load fees.";

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
    loadFees();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedFeeId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await feeService.deleteFee(selectedFeeId);

      setShowConfirm(false);
      setSelectedFeeId(null);

      setToast({
        message: "Fee deleted successfully.",
        type: "success",
      });

      await loadFees();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete fee.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedFeeId(null);
  };

  // SEARCH
  const filteredFees = fees.filter((item) => {
    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    const dueDate = item.dueDate
      ? new Date(item.dueDate)
          .toLocaleDateString()
          .toLowerCase()
      : "";

    const paidDate = item.paidDate
      ? new Date(item.paidDate)
          .toLocaleDateString()
          .toLowerCase()
      : "";

    return (
      item.studentId
        ?.toString()
        .includes(searchText) ||
      item.amount
        ?.toString()
        .includes(searchText) ||
      dueDate.includes(searchText) ||
      paidDate.includes(searchText) ||
      item.status
        ?.toLowerCase()
        .includes(searchText) ||
      item.remarks
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return <Loader text="Loading fees..." />;
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
        <h1>Fees</h1>

        {isAdmin && (
          <Link to="/fees/add">
            <button>Add Fee</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search fees..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredFees.length === 0 ? (
        <p>No fees found.</p>
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
              <th>Amount</th>
              <th>Due Date</th>
              <th>Paid Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredFees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.studentId}</td>

                <td>{item.amount}</td>

                <td>
                  {item.dueDate
                    ? new Date(
                        item.dueDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {item.paidDate
                    ? new Date(
                        item.paidDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>{item.status}</td>

                <td>
                  {item.remarks || "-"}
                </td>

                <td>
                  {item.isActive ? "Yes" : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/fees/edit/${item.id}`}
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
          fees.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this fee?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default FeeList;