import { useEffect, useState } from "react";
import AddNewBlogForm from "./components/AddNewBlogForm";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [visability, setVisability] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("bloglistAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setNotification("error");
      setTimeout(() => {
        setNotification("");
        setUsername("");
        setPassword("");
      }, 1000);
    }
  };

  const addNewBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const blog = await blogService.create(newBlog);

      setBlogs([...blogs, blog]);
      setNotification("success");

      setTimeout(() => {
        setNotification("");
        setAuthor("");
        setTitle("");
        setURL("");
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
          <LogIn
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            login={handleLogin}
            notification={notification}
            visability={visability}
            setVisability={setVisability}
          />
        </Togglable>
      ) : (
        <div>
          <Togglable buttonLabel="new blog">
            <AddNewBlogForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setURL={setURL}
              addNote={addNewBlog}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            name={user.name}
            logout={handleLogout}
            type={notification}
            title={title}
            author={author}
            deleteNote={deleteNote}
          />
        </div>
      )}
    </div>
  );
};

export default App;
