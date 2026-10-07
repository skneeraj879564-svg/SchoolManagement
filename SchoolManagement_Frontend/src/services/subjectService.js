import api from "./api";

const getSubjects = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get(
    `/Subjects?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getSubjectById = async (id) => {
  const response = await api.get(`/Subjects/${id}`);

  return response.data;
};

const createSubject = async (subjectData) => {
  const response = await api.post(
    "/Subjects",
    subjectData
  );

  return response.data;
};

const updateSubject = async (id, subjectData) => {
  const response = await api.put(
    `/Subjects/${id}`,
    subjectData
  );

  return response.data;
};

const deleteSubject = async (id) => {
  const response = await api.delete(
    `/Subjects/${id}`
  );

  return response.data;
};

const subjectService = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};

export default subjectService;