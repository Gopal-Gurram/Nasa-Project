const express = require("express");
const { getAllPlanets } = require("./planets.controller");

const planetRounter = express.Router();

planetRounter.get("/planets", getAllPlanets);

module.exports = planetRounter;
