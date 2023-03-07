import React from "react";

const PersonsForm = ({ handlePersonSubmit, name, number }) => {
  return (
    <>
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
    </>
  )
}

export default PersonsForm