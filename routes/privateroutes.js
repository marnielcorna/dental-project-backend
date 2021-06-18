const express = require("express");
const router = express.Router();
const AppUser = require("../model/Appuser");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");

router.get("/home/:id", async (req, res) => {
  let id = req.params.id;
  let user = await AppUser.findById(id).then((founduser) => {
    return founduser;
  });
  res.send(user);
});

router.get("/users", (req, res) => {
  Patient.find().then((patientid) => {
    res.send(patientid);
  });
});

router.get("/patients", (req, res) => {
  Patient.find().then((patientid) => {
    res.send(patientid);
  });
});

router.get("/appointment/:id", async (req, res) => {
  let id = req.params.id;
  let patientAppointment = await Appointment.findById(id).then((foundAppointment) => {
    return foundAppointment;
  });
  res.send(patientAppointment);
});

module.exports = router;
