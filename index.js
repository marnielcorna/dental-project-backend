
const express = require("express");

const user = require("./routes/user");
require ("./config/db");
const privateroutes = require("./routes/privateroutes");


const app = express();

//PUERTO
const PORT = process.env.PORT || 3500;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req, res) => {
    res.json({message: "API Trabajando"});
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use ("/user", user);

app.use ("/", privateroutes);

app.listen(PORT, (req, res) => {
    console.log(`Servidor Funcionando en ${PORT}`);
});