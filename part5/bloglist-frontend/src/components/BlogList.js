import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, name, logout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {name} logged in <button onClick={logout}>Log out</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
