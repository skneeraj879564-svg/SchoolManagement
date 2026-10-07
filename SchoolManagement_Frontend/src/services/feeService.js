import api from "./api";

const getFees = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await api.get(
    `/Fees?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getFeeById = async (id) => {
  const response = await api.get(`/Fees/${id}`);

  return response.data;
};

const createFee = async (feeData) => {
  const response = await api.post(
    "/Fees",
    feeData
  );

  return response.data;
};

const updateFee = async (id, feeData) => {
  const response = await api.put(
    `/Fees/${id}`,
    feeData
  );

  return response.data;
};

const deleteFee = async (id) => {
  const response = await api.delete(`/Fees/${id}`);

  return response.data;
};

const feeService = {
  getFees,
  getFeeById,
  createFee,
  updateFee,
  deleteFee,
};

export default feeService;