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
      const index = state.findIndex(blog =>  blog.id === id);
      state.splice(index, 1);
      return state;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      state = action.payload;
      return state;
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

export const addBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog);
    dispatch(appendBlog(blog));
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
    dispatch(initializeBlogs());
  };
};


export default blogSlice.reducer;