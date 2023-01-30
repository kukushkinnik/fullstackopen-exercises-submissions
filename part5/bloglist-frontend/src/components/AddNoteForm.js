import React from "react";

const AddNoteForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setURL,
  addNote,
}) => {
  return (
    <form onSubmit={addNote}>
      <label>title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>author:</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label>url:</label>
      <input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default AddNoteForm;
