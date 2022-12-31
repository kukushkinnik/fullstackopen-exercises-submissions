import React, { useEffect, useState } from "react";
import Error from "./components/Error";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Success from "./components/Success";
import phoneService from "./services/phones";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    phoneService.getAll().then((allPhones) => setPersons(allPhones));
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value);
  };

  const addNewPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    checkIfExists(newPerson);
  };

  const checkIfExists = (newPerson) => {
    let result = persons.some((person) => person.name === newName);

    if (result) {
      const update = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (update) {
        const existing = persons.filter(
          (person) => newPerson.name === person.name
        );
        console.log(newPerson.number);
        updatePhone(existing[0].id, newPerson.number);
      }
    } else {
      phoneService.create(newPerson).then((returnedPhone) => {
        setNewName("");
        setSuccessMessage(`Added ${newPerson.name}`);
        setPersons(persons.concat(returnedPhone));
      });
    }
  };

  const filteredList = (e) => {
    setFilter(e.target.value);
    setShowAll(false);
  };

  const deletePhone = (id) => {
    const person = persons.filter((person) => person.id === id);
    const deletePhone = window.confirm(`Delete ${person[0].name}`);
    if (deletePhone) {
      phoneService.deleteP(id).then((deleted) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const updatePhone = (id, number) => {
    const person = persons.find((person) => person.id === id);
    const newPhone = { ...person, number: number };

    phoneService
      .update(id, newPhone)
      .then((returnedNote) => {
        console.log(`${newPhone.name}was updated`);
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedNote))
        );
      })
      .catch((error) => {
        setErrorMessage(`${newPhone.name} was already deleted from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const personToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Success message={successMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} filtered={filteredList} />
      <br />
      <h3>Add new Person</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={personToShow} deletePhone={deletePhone} />
    </div>
  );
}

export default App;
