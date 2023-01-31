import React, { useState } from "react";

const Togglable = ({ children, buttonLabel }) => {
  const [visability, setVisability] = useState(false);
  const hideWhenVisible = { display: visability ? "none" : "" };
  const showWhenVisible = { display: visability ? "" : "none" };

  const toggleVisability = () => setVisability(!visability);

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisability}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisability}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
