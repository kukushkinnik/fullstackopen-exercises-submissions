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
    <div>
      <h2>Add new</h2>
      <form onSubmit={addNote}>
        <label>title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label>url:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddNoteForm;
