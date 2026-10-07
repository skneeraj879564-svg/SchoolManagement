import api from "./api";

const getClassSubjects = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await api.get(
    `/ClassSubjects?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getClassSubjectById = async (id) => {
  const response = await api.get(
    `/ClassSubjects/${id}`
  );

  return response.data;
};

const createClassSubject = async (classSubjectData) => {
  const response = await api.post(
    "/ClassSubjects",
    classSubjectData
  );

  return response.data;
};

const updateClassSubject = async (
  id,
  classSubjectData
) => {
  const response = await api.put(
    `/ClassSubjects/${id}`,
    classSubjectData
  );

  return response.data;
};

const deleteClassSubject = async (id) => {
  const response = await api.delete(
    `/ClassSubjects/${id}`
  );

  return response.data;
};

const classSubjectService = {
  getClassSubjects,
  getClassSubjectById,
  createClassSubject,
  updateClassSubject,
  deleteClassSubject,
};

export default classSubjectService;