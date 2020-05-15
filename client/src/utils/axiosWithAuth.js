import axios from "axios";

const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://serene-reef-93732.herokuapp.com",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export default axiosWithAuth;
