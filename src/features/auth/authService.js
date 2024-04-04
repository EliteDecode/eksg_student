import axios from "axios";

const API_URL = "https://api.eksexams.com/api";

const logout = async () => {
  localStorage.removeItem("studentUser");
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/student/login`, userData);

  if (response.data) {
    localStorage.setItem("studentUser", JSON.stringify(response.data));
  }
  return response.data;
};

const registerAdmin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/user`, userData, config);

  console.log(response.data);

  return response.data;
};

const updateAdmin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/user/${userData.id}`,
    userData,
    config
  );

  console.log(response.data);

  return response.data;
};

const authService = {
  logout,
  login,
  registerAdmin,
  updateAdmin,
};

export default authService;
