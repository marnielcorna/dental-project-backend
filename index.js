
const express = require("express");


require ("./config/db");
const privateroutes = require("./routes/privateroutes");
const authentication = require("./routes/authentication");


const app = express();

//PUERTO
const PORT = process.env.PORT || 4000;

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


app.use ("/", privateroutes);
app.use("/", authentication);

app.listen(PORT, (req, res) => {
    console.log(`Server started at port ${PORT}`);
});

