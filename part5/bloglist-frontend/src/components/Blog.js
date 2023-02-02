import React, { useState } from "react";

const Blog = ({ blog, name, deleteBlog, handleLikes }) => {
  const [view, setView] = useState(false);

  const hide = { display: view ? "" : "none" };

  const moreInfo = () => setView(!view);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    width: "10%",
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={moreInfo}>{view ? "hide" : "view"}</button>{" "}
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
      <div style={hide}>
        {blog.url}
        <br />
        likes {blog.likes}{" "}
        <button onClick={() => handleLikes(blog.id)}>like</button> <br />
        {name}
        <br />
      </div>
    </div>
  );
};

export default Blog;
