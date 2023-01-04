require("dotenv").config();
const express = require("express");
const Phone = require("./models/phone");
const app = express();
const PORT = process.env.PORT;

app.use(express.static("build"));
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (req, res) => {
  Phone.find({}).then((phones) => res.json(phones));
});

app.get("/api/persons/:id", (req, res, next) => {
  Phone.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        return res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  const time = new Date().toLocaleString();

  Phone.find({}).then((persons) => {
    res.send(
      `<div>
        <p>Phone book has info for  ${persons.length} people</p>
      </div>
      <div>
        <p>${time}</p>
      </div>
      `
    );
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "field is missing",
    });
  }

  const person = new Phone({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPhone) => res.json(savedPhone));
});

app.put("/api/persons", (req, res, next) => {
  const person = {
    name: body.name,
    number: body.number,
  };

  Phone.findByIdAndUpdate(req.body.id, person, { new: true })
    .then((updatedPhone) => res.json(updatedPhone))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Phone.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
