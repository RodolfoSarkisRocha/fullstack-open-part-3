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

// Get Person by ID
app.get("/api/persons/:id", (request, response, next) => {
  const id = Number(request.params.id);
  Person.findById(id)
    .then((note) => {
      if (note) response.json(note);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

// Delete Person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);  
  
  Person.findByIdAndRemove(id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

// Generates a random id for the POST body
// const generateId = () => {
//   const randomId = Math.floor(Math.random() * Math.floor(999999999));
//   const idExists = persons.some((person) => person.id === randomId);
//   if (idExists) return generateId();
//   return randomId;
// };

// Validates the body of the persons POST
const validateBody = (body, checkValues) => {
  if (!body) return false;
  const values = checkValues.map((key) => body[key]);
  const invalidValues = values.some(
    (value) => value === null || value === undefined || value === ""
  );
  return invalidValues;
};

const verifyIfNameExists = (name) => {
  return new Promise((resolve, reject) => {
    Person.find({})
      .then((result) => {
        const nameAlreadyExists = result.find((person) => person.name === name);
        resolve(nameAlreadyExists);
      })
      .catch((err) => reject(err));
  });
};

// Persons POST
app.post("/api/persons", async (request, response, next) => {
  const { body } = request;

  const checkValues = ["name", "number"];
  if (validateBody(body, checkValues)) {
    return response.status(400).json({
      error: "number or name is missing",
    });
  }

  const { name, number } = body;

  const nameAlreadyExists = await verifyIfNameExists(name);

  if (nameAlreadyExists) {
    const { _id } = nameAlreadyExists;
    Person.findByIdAndUpdate(_id, {...nameAlreadyExists, number}, {
      new: true,
    }).then((updatedPerson) =>
      response.json(updatedPerson).catch((error) => next(error))
    );
  }

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

// Error Handlers
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
