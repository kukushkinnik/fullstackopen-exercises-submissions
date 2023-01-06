require("dotenv").config();
const express = require("express");
const Phone = require("./models/phone");
const app = express();
const PORT = process.env.PORT;

app.use(express.static("build"));
app.use(express.json());

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

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Phone({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPhone) => res.json(savedPhone))
    .catch((error) => next(error));
});

app.put("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  Phone.findByIdAndUpdate(
    req.body.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((updatedPhone) => res.json(updatedPhone))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Phone.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
