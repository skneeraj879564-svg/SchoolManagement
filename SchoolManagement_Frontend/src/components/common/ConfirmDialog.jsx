const ConfirmDialog = ({
  message = "Are you sure?",
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "8px",
          width: "350px",
          maxWidth: "90%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h3>Confirmation</h3>

        <p>{message}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: "#6c757d",
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;