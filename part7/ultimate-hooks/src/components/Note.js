import React from "react";

const Note = ({ id, content }) => {
  return (
    <p key={id}>{content}</p>
  )
}

export default Note;