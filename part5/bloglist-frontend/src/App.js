import { useEffect, useState } from "react";
import AddNoteForm from "./components/AddNoteForm";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
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
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification("error");
      setTimeout(() => {
        setNotification("");
      }, 4000);
    }
  };

  const addNewNote = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      author,
      url,
    };
    try {
      const blog = await blogService.create(newNote);

      setBlogs([...blogs, blog]);
      setNotification("success");

      setTimeout(() => {
        setNotification("");
        setAuthor("");
        setTitle("");
        setURL("");
      }, 4000);
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
      {user === null ? (
        <LogIn
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          login={handleLogin}
          notification={notification}
        />
      ) : (
        <div>
          <AddNoteForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setURL={setURL}
            addNote={addNewNote}
          />
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
