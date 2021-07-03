require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const minPassLength = 8;
const expirationTime = 1500;
const Appointment = require("../model/Appointment");
const User = require("../model/Appuser");

authRoutes.post("/signup", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  const role = req.body.role;
  if (!user || !pass || !role) {
    res.send({
      auth: false,
      token: null,
      message: "Provide an username, password and role ",
    });
    return;
  }

  if (pass.length < minPassLength) {
    res.send({
      auth: false,
      token: null,
      message:
        "Please make your password at least 8 characters long for security purposes",
    });
    return;
  }

  let foundUser = await User.findOne({ username: user }).then(
    (repeatedUser) => {
      return repeatedUser;
    }
  );

  if (foundUser != null) {
    res.send({
      auth: false,
      token: null,
      message: "User is already taken. Choose another one",
    });
    return;
  }

  const hashPass = bcrypt.hashSync(pass, salt);

  let newUser = await User.create({
    username: user,
    password: hashPass,
    role: role
  })
    .then((createdUser) => {
      return createdUser;
    })
    .catch((error) => {
      res.send({
        auth: false,
        token: null,
        message: `We have get the following error: ${error}`,
      });
      return;
    });

  const newToken = jwt.sign({ id: newUser._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });
  res.send({
    auth: true,
    token: newToken,
  });
});

authRoutes.get("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = await User.findOne({ username: username }).then((userFound) => {
    return userFound;
  });

  if (!user) {
    res.send({
      auth: false,
      token: null,
      message: "User does not exist",
    });
    return;
  }
  let passwordIsValid = await bcrypt.compare(password, user.password);

  if (passwordIsValid == false) {
    res.send({
      auth: false,
      token: null,
      message: "Incorrect Password",
    });
    return;
  }
  const newToken = jwt.sign({ id: user.id, role: user.role}, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });
  res.send({
    auth: true,
    token: newToken,
  });
});

/*----------AHORA  RUTA PRIVADA-------------*/
// DECLARAMOS ARRIBA authroutes

authRoutes.get("/private", async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send({
      auth: false,
      message: "There is no token provided",
    });
    return;
  }
  const decoded = jwt.verify(token, process.env.SECRET_WORD);
  const user = await User.findById(decoded.id, { password: 0 }).populate(
    "privateroutes"
  );
  if (!user) {
    res.send({
      auth: false,
      message: "User does not exists",
    });
  }
  res.send(user);
});

module.exports = authRoutes;
