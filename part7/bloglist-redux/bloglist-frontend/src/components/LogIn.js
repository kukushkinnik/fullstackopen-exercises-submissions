import PropType from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const LogIn = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const logIn = (e) => {
    e.preventDefault();
    login({ username, password });
    dispatch(setNotification("Wrong username or password", 2));
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
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:
          <input
            id="password"
            type="text"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

LogIn.propType = {
  login: PropType.func.isRequired,
  username: PropType.string.isRequired,
  password: PropType.string.isRequired,
  setUsername: PropType.func.isRequired,
  setPassword: PropType.func.isRequired,
};

export default LogIn;
