import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    like(state, action){
      const id = action.payload.id;
      const updatedBlog = action.payload;
      return state.map(blog => blog.id !== id ? blog : updatedBlog);
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter(blog => blog.id !== id );
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    }
  }
});

export const { appendBlog, setBlogs, like, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likes = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateLikes(id, { ...blog, likes: blog.likes + 1 });
    dispatch(like(updatedBlog));
  };
};

export const deleting = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};


export default blogSlice.reducer;