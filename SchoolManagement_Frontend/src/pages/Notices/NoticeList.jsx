import SearchBox from "../../components/common/SearchBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noticeService from "../../services/noticeService";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

const NoticeList = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] =
    useState(null);

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await noticeService.getNotices(
        pageNumber,
        pageSize
      );

      setNotices(response.data || []);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load notices.";

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
    loadNotices();
  }, [pageNumber]);

  const handleDeleteClick = (id) => {
    setSelectedNoticeId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");

      await noticeService.deleteNotice(
        selectedNoticeId
      );

      setShowConfirm(false);
      setSelectedNoticeId(null);

      setToast({
        message: "Notice deleted successfully.",
        type: "success",
      });

      await loadNotices();
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete notice.";

      setError(errorMessage);

      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setSelectedNoticeId(null);
  };

  // SEARCH
  const filteredNotices = notices.filter((item) => {
    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    const publishDate = item.publishDate
      ? new Date(item.publishDate)
          .toLocaleDateString()
          .toLowerCase()
      : "";

    const expiryDate = item.expiryDate
      ? new Date(item.expiryDate)
          .toLocaleDateString()
          .toLowerCase()
      : "";

    return (
      item.title
        ?.toLowerCase()
        .includes(searchText) ||
      item.content
        ?.toLowerCase()
        .includes(searchText) ||
      publishDate.includes(searchText) ||
      expiryDate.includes(searchText)
    );
  });

  if (loading) {
    return <Loader text="Loading notices..." />;
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
        <h1>Notices</h1>

        {isAdmin && (
          <Link to="/notices/add">
            <button>Add Notice</button>
          </Link>
        )}

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search notices..."
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {filteredNotices.length === 0 ? (
        <p>No notices found.</p>
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
              <th>Title</th>
              <th>Content</th>
              <th>Publish Date</th>
              <th>Expiry Date</th>
              <th>Active</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredNotices.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.title}</td>

                <td>{item.content}</td>

                <td>
                  {item.publishDate
                    ? new Date(
                        item.publishDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {item.expiryDate
                    ? new Date(
                        item.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {item.isActive ? "Yes" : "No"}
                </td>

                {isAdmin && (
                  <td>
                    <Link
                      to={`/notices/edit/${item.id}`}
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
          notices.length === pageSize
        }
      />

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this notice?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default NoticeList;