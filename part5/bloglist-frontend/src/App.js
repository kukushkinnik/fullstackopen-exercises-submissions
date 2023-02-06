import { useEffect, useRef, useState } from "react";
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

  const blogFormRef = useRef();

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
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs([...blogs, blog]);
      setNotification("success");
      console.log(blog.author);
      setTimeout(() => {
        setNotification("");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const confirmDelete = window.confirm("Do you wish to delete?");
      if (confirmDelete) {
        // eslint-disable-next-line no-unused-vars
        const blogToDelete = await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setNotification("deleted successfully");
        setTimeout(() => {
          setNotification("");
        }, 1000);
      }
    } catch (error) {
      setNotification("error deleting");
      setTimeout(() => {
        setNotification("");
      }, 1000);
    }
  };

  const handleLikes = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlogs = await blogService.updateLikes(id, changedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlogs)));
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
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <AddNewBlogForm addBlog={addNewBlog} />
          </Togglable>
          <BlogList
            blogs={blogs}
            name={user.name}
            logout={handleLogout}
            type={notification}
            deleteBlog={deleteBlog}
            like={handleLikes}
            username={user.username}
          />
        </div>
      )}
    </div>
  );
};

export default App;
