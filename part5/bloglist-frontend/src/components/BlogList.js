import React, { useState } from "react";
import Blog from "./Blog";
import Notification from "./Notification";

const BlogList = ({
  blogs,
  name,
  logout,
  type,
  deleteBlog,
  like,
  username,
}) => {
  const [displaySorted, setDisplaySorted] = useState(false);
  const sorted = [...blogs];

  const sortByLikes = () => {
    sorted.sort((a, b) => b.likes - a.likes);
    setDisplaySorted(!displaySorted);
  };

  if (displaySorted) {
    return (
      <div>
        <p>
          {name} logged in{" "}
          <button id="logout_btn" onClick={logout}>
            Log out
          </button>
        </p>
        <h2>blogs</h2>
        <Notification type={type} />
        <button id="sort" onClick={sortByLikes}>
          sort by {displaySorted ? "default" : "likes"}
        </button>

        {sorted
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <>
              <Blog
                blog={blog}
                name={name}
                deleteBlog={deleteBlog}
                id={blog.id}
                handleLikes={like}
                user={username}
              />
              <br />
            </>
          ))}
      </div>
    );
  }

  return (
    <div>
      <p>
        {name} logged in{" "}
        <button id="logout_btn" onClick={logout}>
          Log out
        </button>
      </p>
      <h2>blogs</h2>
      <Notification type={type} />
      <button onClick={sortByLikes}>
        sort by {displaySorted ? "default" : "likes"}
      </button>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            blog={blog}
            name={name}
            deleteBlog={deleteBlog}
            id={blog.id}
            handleLikes={like}
            user={username}
          />
          <br />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
