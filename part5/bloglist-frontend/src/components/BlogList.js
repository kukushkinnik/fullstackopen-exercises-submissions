import React from "react";
import Blog from "./Blog";
import Notification from "./Notification";

const BlogList = ({ blogs, name, logout, type, deleteBlog }) => {
  return (
    <div>
      <p>
        {name} logged in <button onClick={logout}>Log out</button>
      </p>
      <h2>blogs</h2>
      <Notification type={type} />
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog blog={blog} name={name} deleteBlog={deleteBlog} id={blog.id} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
