import api from "./api";

const login = async (email, password) => {
  const response = await api.post("/Auth/login", {
    email,
    password,
  });

  return response.data;
};

const register = async (fullName, email, password) => {
  const response = await api.post("/Auth/register", {
    fullName,
    email,
    password,
  });

  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;