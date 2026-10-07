const Toast = ({
  message,
  type = "success",
  onClose,
}) => {
  if (!message) {
    return null;
  }

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "25px",
        zIndex: 2000,
        minWidth: "280px",
        maxWidth: "400px",
        padding: "14px 18px",
        borderRadius: "8px",
        backgroundColor: isSuccess
          ? "#d1e7dd"
          : "#f8d7da",
        color: isSuccess
          ? "#0f5132"
          : "#842029",
        border: `1px solid ${
          isSuccess ? "#badbcc" : "#f1aeb5"
        }`,
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        style={{
          backgroundColor: "transparent",
          color: isSuccess
            ? "#0f5132"
            : "#842029",
          padding: "0",
          margin: "0",
          fontSize: "18px",
          fontWeight: "bold",
          lineHeight: "1",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;