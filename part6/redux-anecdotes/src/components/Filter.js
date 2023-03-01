import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div styule={style}>
      filter <input onChange={(event) => handleChange(event)} />
    </div>
  )
}

export default Filter