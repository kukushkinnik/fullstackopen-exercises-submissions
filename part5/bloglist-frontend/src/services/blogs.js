import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

let setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    header: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken };
