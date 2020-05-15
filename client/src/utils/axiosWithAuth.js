import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://serene-reef-93732.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
