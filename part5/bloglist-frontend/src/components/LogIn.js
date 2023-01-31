import React, { useState } from "react";
import Notification from "./Notification";

const LogIn = ({ login, notification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    login({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log In </h2>
      {notification === "error" && <Notification type={notification} />}
      <form onSubmit={logIn}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="text"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
