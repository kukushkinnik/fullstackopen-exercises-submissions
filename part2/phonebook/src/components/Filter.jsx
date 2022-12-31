import React from "react";
import Input from "./Input";

const Filter = ({ filter, filtered }) => {
  return (
    <div>
      <Input name={"filter"} value={filter} change={filtered} />
    </div>
  );
};

export default Filter;
