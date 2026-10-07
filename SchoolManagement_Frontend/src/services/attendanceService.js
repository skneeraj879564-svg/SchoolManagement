import api from "./api";

const getAttendances = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await api.get(
    `/Attendance?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getAttendanceById = async (id) => {
  const response = await api.get(
    `/Attendance/${id}`
  );

  return response.data;
};

const createAttendance = async (attendanceData) => {
  const response = await api.post(
    "/Attendance",
    attendanceData
  );

  return response.data;
};

const updateAttendance = async (
  id,
  attendanceData
) => {
  const response = await api.put(
    `/Attendance/${id}`,
    attendanceData
  );

  return response.data;
};

const deleteAttendance = async (id) => {
  const response = await api.delete(
    `/Attendance/${id}`
  );

  return response.data;
};

const attendanceService = {
  getAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};

export default attendanceService;