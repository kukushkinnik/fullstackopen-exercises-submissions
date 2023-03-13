/* eslint-disable no-unused-vars */
import {  useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import AddNewBlogForm from "./components/AddNewBlogForm";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("bloglistAppUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  // const handleLogin = async (userInfo) => {
  //   try {
  //     const user = await loginService.login(userInfo);
  //     window.localStorage.setItem("bloglistAppUser", JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleLogout = () => {
    window.localStorage.removeItem("bloglistAppUser");
    setUser(null);
  };

  return (
    <div>
      <h1>Blogs App</h1>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <AddNewBlogForm  />
        </Togglable>
        <BlogList
          // name={user.name}
          logout={handleLogout}
          // username={user.username}
        />
      </div>
      {/* {user === null ? (
        <Togglable buttonLabel="log in">
          <LogIn login={handleLogin}  />
        </Togglable>
      ) : (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <AddNewBlogForm addBlog={addNewBlog} />
          </Togglable>
          <BlogList
            blogs={blogs}
            name={user.name}
            logout={handleLogout}
            deleteBlog={deleteBlog}
            like={handleLikes}
            username={user.username}
          />
        </div>
      )} */}
    </div>
  );
};

export default App;
