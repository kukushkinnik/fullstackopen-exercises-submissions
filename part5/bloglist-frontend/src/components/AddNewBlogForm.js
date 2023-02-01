import React, { useState } from "react";

const AddNewBlogForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const addNewBlog = (e) => {
    e.preventDefault();

    addNote({ title, author, url });

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
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label>url:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddNewBlogForm;
