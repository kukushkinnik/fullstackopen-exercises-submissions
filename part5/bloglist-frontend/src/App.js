import { useEffect, useState } from "react";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      console.error(error);
    }
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
        />
      ) : (
        <BlogList blogs={blogs} name={user.name} logout={handleLogout} />
      )}
    </div>
  );
};

export default App;
