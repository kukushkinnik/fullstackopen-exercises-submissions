import React, { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visability, setVisability] = useState(false);
  const hideWhenVisible = { display: visability ? "none" : "" };
  const showWhenVisible = { display: visability ? "" : "none" };

  const toggleVisibility = () => setVisability(!visability);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
