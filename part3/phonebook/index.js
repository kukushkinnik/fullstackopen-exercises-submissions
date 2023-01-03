const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const endForRange = 1000;
  const currMaxId = Math.max(...phonebook.map((p) => p.id));
  const newId = Math.floor(
    Math.random() * (endForRange - currMaxId + 1) + currMaxId
  );
  return newId;
};

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/info", (req, res) => {
  const info = `<p>Phonebook has info for ${phonebook.length} ${
    phonebook.length === 1 ? "person" : "people"
  }</p>
  <p>${new Date()}</p>`;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "field is missing",
    });
  }

  const findIfExists = phonebook.find((person) => person.name === body.name);

  if (findIfExists) {
    return res.status(404).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phonebook = phonebook.concat(person);
  res.json(phonebook);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
