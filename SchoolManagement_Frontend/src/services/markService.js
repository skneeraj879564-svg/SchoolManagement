import api from "./api";

const getMarks = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await api.get(
    `/Marks?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getMarkById = async (id) => {
  const response = await api.get(`/Marks/${id}`);

  return response.data;
};

const createMark = async (markData) => {
  const response = await api.post(
    "/Marks",
    markData
  );

  return response.data;
};

const updateMark = async (id, markData) => {
  const response = await api.put(
    `/Marks/${id}`,
    markData
  );

  return response.data;
};

const deleteMark = async (id) => {
  const response = await api.delete(`/Marks/${id}`);

  return response.data;
};

const markService = {
  getMarks,
  getMarkById,
  createMark,
  updateMark,
  deleteMark,
};

export default markService;