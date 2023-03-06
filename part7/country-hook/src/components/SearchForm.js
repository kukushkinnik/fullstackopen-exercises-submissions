import React from "react";


const SearchForm = ({ fetch, nameInput }) => {

  return (
    < form onSubmit={fetch} >
      <input {...nameInput} />
      <button>find</button>
    </form >
  )
}

export default SearchForm;