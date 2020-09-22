const express = require("express");
const app = express();
const morgan = require("morgan");
const { token } = require("morgan");
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/people");

app.use(cors());
app.use(express.json());

// Using build folder to serve frontend app
app.use(express.static("build"));

// Creating custom token to log request body to morgan console
token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Get all people from phonebook
app.get("/api/people", (request, response) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((err) => {
      response.status(400).json({
        error: err,
        message: "could not fetch data from the server",
      });
    });
});

// Information about how many people phonebook has registered and the current time
app.get("/info", (request, response) => {
  Person.find({})
    .then((people) => {
      const totalPeople = people.length;
      const date = new Date();
      response.send(
        `<div>${`Phonebook has info for ${totalPeople} people`}</div><br><div>${date}</div>`
      );
    })
    .catch((err) => {
      response.status(400).json({
        error: err,
        message: "could not fetch data from server",
      });
    });
});

// Get Person by ID
app.get("/api/people/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((note) => {
      if (note) response.json(note);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

// Edit Person
app.put("/api/people/:id", (request, response, next) => {
  const {
    body: { name, number },
    params: { id },
  } = request;

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
  }).then((updatedPerson) =>
    response.json(updatedPerson).catch((error) => next(error))
  );
});

// Delete Person
app.delete("/api/people/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

// Generates a random id for the POST body
// const generateId = () => {
//   const randomId = Math.floor(Math.random() * Math.floor(999999999));
//   const idExists = people.some((person) => person.id === randomId);
//   if (idExists) return generateId();
//   return randomId;
// };

// Validates the body of the people POST
const validateBody = (body, checkValues) => {
  if (!body) return false;
  const values = checkValues.map((key) => body[key]);
  const invalidValues = values.some(
    (value) => value === null || value === undefined || value === ""
  );
  return invalidValues;
};

// const verifyIfNameExists = (name) => {
//   return new Promise((resolve, reject) => {
//     Person.find({})
//       .then((result) => {
//         const nameAlreadyExists = result.find((person) => person.name === name);
//         resolve(nameAlreadyExists);
//       })
//       .catch((err) => reject(err));
//   });
// };

// people POST
app.post("/api/people", (request, response, next) => {
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
