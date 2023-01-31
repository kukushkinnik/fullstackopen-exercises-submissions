import { useEffect, useState } from "react";
import AddNewBlogForm from "./components/AddNewBlogForm";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bloglistAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userInfo) => {
    try {
      const user = await loginService.login(userInfo);
      window.localStorage.setItem("bloglistAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setNotification("error");
      setTimeout(() => {
        setNotification("");
      }, 1000);
    }
  };

  const addNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);

      setBlogs([...blogs, blog]);
      setNotification("success");

      setTimeout(() => {
        setNotification("");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    const blogToDelete = await blogService.deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("bloglistAppUser");
    setUser(null);
  };

  return (
    <div>
      <h1>Blogs App</h1>
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LogIn login={handleLogin} notification={notification} />
        </Togglable>
      ) : (
        <div>
          <Togglable buttonLabel="new blog">
            <AddNewBlogForm addNote={addNewBlog} />
          </Togglable>
          <BlogList
            blogs={blogs}
            name={user.name}
            logout={handleLogout}
            type={notification}
            deleteNote={deleteNote}
          />
        </div>
      )}
    </div>
  );
};

export default App;
