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

router.get("/user/patient/:patientId", async (req, res) => {
  let mytoken = req.headers.token;
  let id = req.params.patientId;
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

/*--------------POST----------------*/
router.post("/user/newpatient", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  let patientName = req.body.name;
  let patientLastname = req.body.lastname;
  let patientAge = req.body.age;
  let patientGender = req.body.gender;
  let patientPhone = req.body.phone;
  let patientAddress = req.body.address;
  let patientCity = req.body.city;
  let patientPostalcode = req.body.postalcode;
  let patient = await Patient.create({
    name: patientName,
    Lastname: patientLastname,
    age: patientAge,
    gender: patientGender,
    phone: patientPhone,
    address: patientAddress,
    city: patientCity,
    postalcode: patientPostalcode,
    appointment: [],
  })
    .then((newPatient) => {
      return newPatient;
    })
    .catch((error) => {
      res.send(error);
    });
  let id = patient._id;

  res.redirect(
    `/user/patient/${id}`
  ); /*PREGUNTAR COMO IMPLEMENTAREMOS EL REDIRECT*/
});

/*---------------DELETE---------------*/

router.delete("/user/delete/:patientId", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  let id = req.params.patientId;
  let patient = await Patient.findByIdAndDelete(id)
    .then((deletedPatient) => {
      return deletedPatient;
    })
    .catch((error) => {
      res.send(error);
    });
  res.send("Your patient has been deleted");
});

/*------------------UPDATE--------------------*/

router.put("/user/updatepatient/:patientId", async (req, res) => {
  let mytoken = req.headers.token;

  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }

  let patientId = req.params.patientId;
  let patientName = req.body.name;
  let patientLastname = req.body.lastname;
  let patientAge = req.body.age;
  let patientGender = req.body.gender;
  let patientPhone = req.body.phone;
  let patientAddress = req.body.address;
  let patientCity = req.body.city;
  let patientPostalcode = req.body.postalcode;

  let patientUpdated = await Patient.findByIdAndUpdate(
    patientId,
    {
      name: patientName,
      lastname: patientLastname,
      age: patientAge,
      gender: patientGender,
      phone: patientPhone,
      address: patientAddress,
      city: patientCity,
      postalcode: patientPostalcode,
      appointment: [],
    },
    { new: true }
  )
    .then((updatedPatient) => {
      return updatedPatient;
    })
    .catch((error) => {
      res.send(error);
    });
  console.log(`${patientUpdated.name} se ha actualizado correctamente`);
  /*PARA EVITAR ERROR findOneAndDelete y findOneAndUpdate, setear la conexion a mongoose mongoose.set('useFindAndModify', false);*/
  res.redirect(`/user/patient/${patientId}`); /*PREGUNTAR A EDU ESTE REDIRECT*/
});

/*-----------------APPOINTMENTS------------------*/

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

/*--------------POST----------------*/
router.post("/user/newappointment", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  let appointmentDate = req.body.dateAppointment;
  let appointmentHour = req.body.hour;
  let appointmentDescription = req.body.description;
  let appointmentTreatment = req.body.treatment;
  let appointmentPatient = req.body.patient;
  let appointment = await Appointment.create({
    dateAppointment: appointmentDate,
    hour: appointmentHour,
    description: appointmentDescription,
    treatment: appointmentTreatment,
    patient: appointmentPatient,
  },
  { new: true }
  )
    .then((newAppointment) => {
      return newAppointment;
    })
    .catch((error) => {
      res.send(error);
    });
  let id = appointment._id;

  res.send("Your appointment has been created");
});

/*---------------DELETE---------------*/

router.delete("/user/deleteappointment/:appointmentId", async (req, res) => {
  let mytoken = req.headers.token;
  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }
  let id = req.params.appointmentId;
  let appointmemnt = await Appointment.findByIdAndDelete(id)
    .then((deletedAppointment) => {
      return deletedAppointment;
    })
    .catch((error) => {
      res.send(error);
    });
  res.send("Your appointment has been deleted");
  /*res.redirect("/user/patients")*/
  /*>>>>>>>>>>>>>>CREAR UN REDIRECT AQUI<<<<<<<<<<<<<*/
});

/*------------------UPDATE--------------------*/

router.put("/user/updateappointment/:appointmentId", async (req, res) => {
  let mytoken = req.headers.token;

  let role = "user";
  let user = await tokenValidation(res, mytoken, role);
  if (!user) {
    return;
  }

  let idAppointment = req.params.appointmentId;
  let appointmentDate = req.body.dateAppointment;
  let appointmentHour = req.body.hour;
  let appointmentDescription = req.body.description;
  let appointmentTreatment = req.body.treatment;
  let appointmentPatient = req.body.patient;

  let appointmentUpdated = await Appointment.findByIdAndUpdate(
    idAppointment,
    {
      dateAppointment: appointmentDate,
      hour: appointmentHour,
      description: appointmentDescription,
      treatment: appointmentTreatment,
      patient: appointmentPatient,
    },
    { new: true }
  )
    .then((updatedPatient) => {
      return updatedPatient;
    })
    .catch((error) => {
      res.send(error);
    });
  res.send(`se ha actualizado correctamente`);
  /*PARA EVITAR ERROR findOneAndDelete y findOneAndUpdate, setear la conexion a mongoose mongoose.set('useFindAndModify', false);*/
  /*res.redirect(`/user/appointment/${appointmentUpdated._Id}`); /*PREGUNTAR A EDU ESTE REDIRECT*/
});

module.exports = router;
