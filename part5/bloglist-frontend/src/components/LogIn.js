import React from "react";

const LogIn = ({ username, setUsername, password, setPassword, login }) => {
  return (
    <div>
      <h1>Log In </h1>
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
