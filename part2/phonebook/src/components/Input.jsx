import React from "react";

const Input = ({ name, value, change }) => {
  if (name === "filter") {
    return (
      <div>
        {name} <input value={value} onChange={change} />
      </div>
    );
  }
  return (
    <div>
      {name} <input value={value} onChange={change} required />
    </div>
  );
};

export default Input;
