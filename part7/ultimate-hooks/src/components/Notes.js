import React from "react";
import Note from "./Note"

const Notes = ({ notes }) => {
  return (
    <>
      {notes.map(note => <Note id={note.id} content={note.content} />)}
    </>
  )
}

export default Notes;