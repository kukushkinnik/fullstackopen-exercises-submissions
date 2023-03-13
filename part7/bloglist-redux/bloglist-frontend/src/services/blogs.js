import axios from "axios";
const baseUrl = "http://localhost:3001/blogs/";

let token = null;

let setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}${id}`, config);
  return response.data;
};

const updateLikes = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}${id}`, updatedBlog, config);
  return response.data;
};

export default { getAll, create, deleteBlog, updateLikes, setToken };
