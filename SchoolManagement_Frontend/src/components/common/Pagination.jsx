const Pagination = ({
  pageNumber,
  onPrevious,
  onNext,
  hasNextPage,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={pageNumber === 1}
      >
        Previous
      </button>

      <span>
        Page {pageNumber}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;