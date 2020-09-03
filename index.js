const express = require("express");
const app = express();

let persons = [
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

// Get by ID
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) response.json(person);
  else {
    response.status(404).json({
      error: "person not found",
    });
  }
});

// Delete
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});


// Generates a random id for the POST body
const generateId = () => {
  const randomId = Math.floor(Math.random() * Math.floor(999999999));
  const idExists = persons.some((person) => person.id === randomId);
  if (idExists) return generateId();
  return randomId;
};

// Validates the body of the persons POST
const validateBody = (body, checkValues) => {
  if (!body) return false;
  const values = checkValues.map((key) => body[key]);
  const invalidValues = values.some(
    (value) => value === null || value === undefined || value === ""
  );
  return invalidValues;
};

// Validates body's name
const validateName = (name) => persons.some((person) => person.name === name);

// Persons POST
app.post("/api/persons", (request, response) => {
  const { body } = request;

  const checkValues = ["name", "number"];
  if (validateBody(body, checkValues)) {
    return response.status(400).json({
      error: "number or name is missing",
    });
  }

  const { name, number } = body;
  if (validateName(name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const id = generateId();
  const person = {
    name,
    number,
    id,
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
