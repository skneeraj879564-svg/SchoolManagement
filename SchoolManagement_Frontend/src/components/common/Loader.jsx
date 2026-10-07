const Loader = ({ text = "Loading..." }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontSize: "16px",
        color: "#555",
      }}
    >
      {text}
    </div>
  );
};

export default Loader;