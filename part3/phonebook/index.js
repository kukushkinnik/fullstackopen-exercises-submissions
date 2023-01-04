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

app.get("/api/persons/:id", (req, res) => {
  Phone.findById(req.params.id).then((person) => res.json(person));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  //NOT WORKGING
  // if (!body.name || !body.number) {
  //   return res.status(404).json({
  //     error: "field is missing",
  //   });
  // }

  // const findIfExists = Phone.find((phone) => phone.name === body.name);

  // if (findIfExists) {
  //   return res.status(404).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Phone({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPhone) => res.json(savedPhone));
});

//NOT WORKING YET
// app.delete("/api/persons/:id", (req, res) => {
//   const query = { id: req.params.id };
//   console.log(query);
//   Phone.deleteOne(query);
//    const id = req.params.id;
//    phonebook = phonebook.filter((person) => person.id !== id);

//   // res.status(204).end();
// });

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
