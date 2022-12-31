import React from "react";

const Persons = ({ persons, deletePhone }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          <p key={person.id}>
            {person.name} {person.number}
          </p>

          <button onClick={() => deletePhone(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
