import api from "./api";

const getNotices = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await api.get(
    `/Notices?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

const getNoticeById = async (id) => {
  const response = await api.get(`/Notices/${id}`);

  return response.data;
};

const createNotice = async (noticeData) => {
  const response = await api.post(
    "/Notices",
    noticeData
  );

  return response.data;
};

const updateNotice = async (id, noticeData) => {
  const response = await api.put(
    `/Notices/${id}`,
    noticeData
  );

  return response.data;
};

const deleteNotice = async (id) => {
  const response = await api.delete(
    `/Notices/${id}`
  );

  return response.data;
};

const noticeService = {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
};

export default noticeService;