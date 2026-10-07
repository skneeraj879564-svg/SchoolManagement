import api from "./api";

const getClasses = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get(
    `/Classes?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getClassById = async (id) => {
  const response = await api.get(`/Classes/${id}`);

  return response.data;
};

const createClass = async (classData) => {
  const response = await api.post(
    "/Classes",
    classData
  );

  return response.data;
};

const updateClass = async (id, classData) => {
  const response = await api.put(
    `/Classes/${id}`,
    classData
  );

  return response.data;
};

const deleteClass = async (id) => {
  const response = await api.delete(
    `/Classes/${id}`
  );

  return response.data;
};

const classService = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};

export default classService;