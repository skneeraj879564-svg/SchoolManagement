import api from "./api";

const getTeachers = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get(
    `/Teachers?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getTeacherById = async (id) => {
  const response = await api.get(`/Teachers/${id}`);

  return response.data;
};

const createTeacher = async (teacherData) => {
  const response = await api.post(
    "/Teachers",
    teacherData
  );

  return response.data;
};

const updateTeacher = async (id, teacherData) => {
  const response = await api.put(
    `/Teachers/${id}`,
    teacherData
  );

  return response.data;
};

const deleteTeacher = async (id) => {
  const response = await api.delete(
    `/Teachers/${id}`
  );

  return response.data;
};

const teacherService = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};

export default teacherService;