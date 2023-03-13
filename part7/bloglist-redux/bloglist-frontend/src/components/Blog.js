/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likes, deleting } from "../reducers/blogReducer";

const Blog = ({ blog, name,  user }) => {
  const [view, setView] = useState(false);
  const dispatch = useDispatch();

  const hide = { display: view ? "" : "none" };

  // const hideDelete = { display: blog.user[0].username !== user ? "none" : "" };

  const moreInfo = () => setView(!view);

  const like = (id) => {
    dispatch(likes(id,blog));
  };

  const deleteBlogPost = (id) => {
    dispatch(deleting(id));
  };

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
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button id="viewHide_btn" onClick={moreInfo}>
        {view ? "hide" : "view"}
      </button>{" "}
      <button
        id="delete_btn"
        // style={hideDelete}
        onClick={() => deleteBlogPost(blog.id)}
      >
        Delete
      </button>
      <div style={hide}>
        {blog.url}
        <br />
        likes {blog.likes}{" "}
        <button id="like_btn" onClick={() => like(blog.id)}>
          like
        </button>{" "}
        <br />
        {name}
        <br />
      </div>
    </div>
  );
};

export default Blog;
