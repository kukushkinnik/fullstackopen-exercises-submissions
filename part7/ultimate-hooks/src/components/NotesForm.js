import React from "react";

const NotesForm = ({ handleNoteSubmit, content }) => {
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
    </div>
  )
}

export default NotesForm