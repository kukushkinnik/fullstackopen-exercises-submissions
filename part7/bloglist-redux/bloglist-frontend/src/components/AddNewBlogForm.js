import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const AddNewBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const addNewBlog = (e) => {
    e.preventDefault();
    const newBlog =  { title,author,url, likes: 0 };
    dispatch(addBlog(newBlog));
    dispatch(setNotification("New blog added", "success", 2));
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={addNewBlog}>
        <label>title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label>url:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button id="create_btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddNewBlogForm;
