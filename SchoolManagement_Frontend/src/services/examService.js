import api from "./api";

const getExams = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await api.get(
    `/Exams?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getExamById = async (id) => {
  const response = await api.get(`/Exams/${id}`);

  return response.data;
};

const createExam = async (examData) => {
  const response = await api.post(
    "/Exams",
    examData
  );

  return response.data;
};

const updateExam = async (id, examData) => {
  const response = await api.put(
    `/Exams/${id}`,
    examData
  );

  return response.data;
};

const deleteExam = async (id) => {
  const response = await api.delete(`/Exams/${id}`);

  return response.data;
};

const examService = {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
};

export default examService;