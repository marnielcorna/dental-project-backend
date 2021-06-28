const express = require("express");
const router = express.Router();

const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const app = express();
const tokenValidation = require("../functions/tokenval");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*--------------------RUTA ADMIN-----------------------*/
router.get("/admin/home", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "administrator";
  let user = await tokenValidation(res, mytoken, role);
  res.send(user);
});

router.get("/admin/patients", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "administrator";
  let patients = await Patient.find().then();
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(patients);
});

router.get("/admin/patient", async (req, res) => {
  let mytoken = req.headers.token;
  let id = req.headers.id;
  let patient = await Patient.findById(id).then((foundPatient) => {
    return foundPatient;
  });

  let role = "administrator";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(patient);
});

router.get("/admin/appointments", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "administrator";
  let appointments = await Appointment.find().then();
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(appointments);
});

router.get("/admin/administration", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "administrator";
  let administration = res.send(
    "AQUI VA LA PAGINA CON BALANCES EMPRESA"
  ); /* --------------CAMBIAR POR FICHEROS/TABLAS--------------------*/
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(administration);
});

/*--------------------RUTA USERS-----------------------*/
router.get("/user/home", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(user);
});

router.get("/user/patients", async (req, res) => {
  let myToken = req.headers.token;
  let role = "user";
  let user = await tokenValidation(res, myToken, role);
  if (!user) {
    return;
  }
  res.send(user.patients);

});

router.get("/user/patient", async (req, res) => {
  let mytoken = req.headers.token;
  let id = req.headers.id;
  let patient = await Patient.findById(id).then((foundPatient) => {
    return foundPatient;
  });
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(patient);
});

/*CREAR CRUD para pacientes*/

router.get("/user/appointments", async (req, res) => {
  let mytoken = req.headers.token;
  let id = req.headers.id;
  let role = "user";
  let appointments = await Appointment.findById(id).then((foundAppointment) => {
    return foundAppointment;
  });
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(user.appointments);
});

router.get("/user/appointment", async (req, res) => {
  let mytoken = req.headers.token;
  let id = req.headers.id;
  let appointment = await Appointment.findById(id).then((foundAppointment) => {
    return foundAppointment;
  });
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  res.send(appointment);
});

/*CREAR CRUD CREAR PARA APPOINTMENTS*/




module.exports = router;
