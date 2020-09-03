const express = require("express");
const app = express();

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

// Get all persons from phonebook
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// Information about how many people phonebook has registered and the current time
app.get("/info", (request, response) => {
  const totalPersons = `Phonebook has info for ${persons.length} people`;
  const date = new Date();
  response.send(`<div>${totalPersons}</div><br><div>${date}</div>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
