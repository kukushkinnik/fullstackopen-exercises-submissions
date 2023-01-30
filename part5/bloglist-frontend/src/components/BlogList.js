import React from "react";
import Blog from "./Blog";
import Notification from "./Notification";

const BlogList = ({ blogs, name, logout, type, title, author, deleteNote }) => {
  return (
    <div>
      <p>
        {name} logged in <button onClick={logout}>Log out</button>
      </p>
      <h2>blogs</h2>
      <Notification type={type} title={title} author={author} />

      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog blog={blog} />
          <button onClick={() => deleteNote(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
