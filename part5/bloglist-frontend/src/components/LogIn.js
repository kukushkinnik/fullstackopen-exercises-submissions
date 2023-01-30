import React from "react";
import Notification from "./Notification";

const LogIn = ({
  username,
  setUsername,
  password,
  setPassword,
  login,
  notification,
}) => {
  return (
    <div>
      <h1>Log In </h1>
      {notification === "error" && <Notification type={notification} />}
      <form onSubmit={login}>
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
