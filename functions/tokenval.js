require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../model/Appuser");

let tokenValidation = async (response, token, role) => {
  let userRole = role;
  let validationResult = {};
  if (!token) {
    response.send({
      auth: false,
      token: null,
      message: "Not Valid Token",
    });
    return;
  }
  try {
    validationResult = jwt.verify(token, process.env.SECRET_WORD);
  } catch (error) {
    response.send({
      auth: false,
      token: null,
      message: "Not Valid Token.",
    });
    return;
  }

  let user = await User.findById(validationResult.id, { password: 0 })
    .populate("appointments").populate("patients");
  if (!user) {
    response.send({
      auth: false,
      message: "User does not exist.",
    });
    return;
  }
  if (user.role != userRole) {
    response.send({
      auth: false,
      message: "You have not permission to access",
    });
    return;
  }
  return user;
};

module.exports = tokenValidation;
