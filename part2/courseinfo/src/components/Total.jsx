import React from "react";

const Total = ({ parts }) => {
  return (
    <>
      <p style={{ fontWeight: "bold" }}>
        Total of{" "}
        {parts.reduce((sum, nextValue) => (sum += nextValue.exercises), 0)}{" "}
        exercises
      </p>
    </>
  );
};

export default Total;
