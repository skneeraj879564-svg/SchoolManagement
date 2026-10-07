const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        maxWidth: "300px",
        marginBottom: "20px",
      }}
    />
  );
};

export default SearchBox;