import React from "react";
import Input from "./Input";

const PersonForm = ({
  addNewPerson,
  newName,
  handleNewName,
  newPhone,
  handleNewPhone,
}) => {
  return (
    <>
      <form onSubmit={addNewPerson}>
        <div>
          <Input name={"name"} value={newName} change={handleNewName} />
        </div>
        <div>
          <Input name={"number"} value={newPhone} change={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
