const express = require("express");
const app = express();
const morgan = require("morgan");
const { token } = require("morgan");
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/persons");
const persons = require("./models/persons");

app.use(cors());
app.use(express.json());

// Using build folder to serve frontend app
app.use(express.static("build"));

// Creating custom token to log request body to morgan console
token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Get all persons from phonebook
app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((err) => {
      response.status(400).json({
        error: err,
        message: "could not fetch data from the server",
      });
    });
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
  Person.findById(id)
    .then((note) => response.json(note))
    .catch((err) =>
      response.status(404).json({
        error: err,
        message: "person not found",
      })
    );
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
  
  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
