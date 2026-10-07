import api from "./api";

const getStudents = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get(
    `/Students?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getStudentById = async (id) => {
  const response = await api.get(`/Students/${id}`);

  return response.data;
};

const createStudent = async (studentData) => {
  const response = await api.post(
    "/Students",
    studentData
  );

  return response.data;
};

const updateStudent = async (id, studentData) => {
  const response = await api.put(
    `/Students/${id}`,
    studentData
  );

  return response.data;
};

const deleteStudent = async (id) => {
  const response = await api.delete(
    `/Students/${id}`
  );

  return response.data;
};

const studentService = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;