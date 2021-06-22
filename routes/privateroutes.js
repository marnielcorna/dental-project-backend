const express = require("express");
const router = express.Router();
const AppUser = require("../model/Appuser");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get("/home/:userId", async (req, res) => {
  let id = req.params.userId;
  let user = await AppUser.findById(id).populate("patients")
  res.send(user);
});

router.get("/users", (req, res) => {
  AppUser.find().then((userid) => {
    res.send(userid);
    console.log("hola users");
  });
});

router.get("/patients", (req, res) => {
    Patient.find().then((patientid) => {
    res.send(patientid);
  });
});

/*CREAR CRUD para pacientes*/

router.get("/patient/:pacientId", async (req, res) => {
  let id = req.params.patientId;

  let patient = await Patient.findById(id).then(
    (foundPatient) => {
      return foundPatient;
    }
  );
  res.send(patient);
});


router.get("/appointments/:userId", async (req, res) => {
  let id = req.params.userId;
  let user = await AppUser.findById(id).populate("appointments");
  res.send(user.appointments);
});

/*CREAR CRUD CREAR PARA APPOINTMENTS*/


router.get("/appointment/:appointmentId", async (req, res) => {
  let id = req.params.appointmentId;

  let appointment = await Appointment.findById(id).then(
    (foundAppointment) => {
      return foundAppointment;
    }
  );
  res.send(appointment);
});

// app.use("/", router);
module.exports = router;
