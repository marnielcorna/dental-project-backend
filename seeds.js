/*--------------------SEEDS------------------*/

require("./config/db");

const AppUser = require("./model/Appuser");
const Patient = require("./model/Patient");
const Appointment = require("./model/Appointment");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const salt = bcrypt.genSaltSync(10);

let users = [
  {
    identification: "X123456W",
    name: "Marcos",
    username: "marcos30",
    password: "12345678",
    lastname: "Cortez",
    age: "31",
    gender: "male",
    account: "####",
    membershipNumber: "123456789",
    specialty: "Technician",
    role: "administrator",
    patients: ["60ca0675f92ac13e1c5d1234"],
  },
  {
    identification: "X111111W",
    name: "Eduardo",
    username: "eduardo30",
    password: "87654321",
    lastname: "Developer",
    age: "31",
    gender: "male",
    account: "####",
    membershipNumber: "1010102020",
    specialty: "Technician",
    role: "AppUser",
    patients: ["60ca0675f92ac13e1c5d4321"],
  },
  {
    identification: "X2222222W",
    name: "Marta",
    username: "marta30",
    password: "123456789",
    lastname: "Gonzales",
    age: "30",
    gender: "female",
    account: "####",
    membershipNumber: "80808080",
    specialty: "Hygienist",
    role: "AppUser",
    patients: ["60ca0675f92ac13e1c5d4567"],
  },
];

let patients = [
  {
    _id: "60ca0675f92ac13e1c5d1234",
    identification: "33333333W",
    name: "María",
    Lastname: "García",
    age: "60",
    gender: "female",
    phone: "906000000",
    address: "C/ calle del centro",
    city: "Zaragoza",
    postalcode: "50001",
    appointments: ["60ca0675f92ac13e1c5d8888"],
  },
  {
    _id: "60ca0675f92ac13e1c5d4321",
    identification: "44444444W",
    name: "Lluís",
    Lastname: "Montblanc",
    age: "35",
    gender: "Male",
    phone: "605000000",
    address: "C/ les feulles",
    city: "Barcelona",
    postalcode: "20001",
    appointments: ["60ca0675f92ac13e1c5d1111"],
  },
  {
    _id: "60ca0675f92ac13e1c5d4567",
    identification: "55555555W",
    name: "Aleksandra",
    Lastname: "Lukic",
    age: "28",
    gender: "female",
    phone: "615000000",
    address: "C/ alfalfa",
    city: "Zaragoza",
    postalcode: "50001",
    appointments: ["60ca0675f92ac13e1c5d2222"],
  },
];

let appointments = [
  {
    _id: "60ca0675f92ac13e1c5d8888",
    dateAppointment: "1st August 2021",
    hour: "16:00",
    description: "Extraction",
    treatment: "",
  },
  {
    _id: "60ca0675f92ac13e1c5d1111",
    dateAppointment: "10th August 2021",
    hour: "10:15",
    description: "Teeth cleanning",
    treatment: "",
  },
  {
    _id: "60ca0675f92ac13e1c5d2222",
    dateAppointment: "25th July 2021",
    hour: "12:00",
    description: "Consultation",
    treatment: "",
  },
];

let weakPasswords = [users[0].password, users[1].password, users[2].password];
let hashedPasswords = [];

weakPasswords.forEach((weakpass) => {
  let hashpass = bcrypt.hashSync(weakpass, salt);
  hashedPasswords.push(hashpass);
});

for(let i=0; i<users.length; i++){
  users[i].password = hashedPasswords[i];
}

AppUser.deleteMany()
  .then(() => {
    console.log("appusers deleted");
    return AppUser.create(users);
  })
  .then((createdUsers) => {
    console.log(`${createdUsers.length} has been created`);
  })
  .then(() => {
    Patient.deleteMany()
      .then(() => {
        console.log("Patients deleted");
        return Patient.create(patients);
      })
      .then((createdPatients) => {
        console.log(`${createdPatients.length} has been created`);
      })
      .then(() => {
        Appointment.deleteMany()
          .then(() => {
            console.log("Appointments deleted");
            return Appointment.create(appointments);
          })
          .then((createAppointments) => {
            console.log(`${createAppointments.length} has been created`);
          })
          .then(() => {
            mongoose.disconnect();
            console.log("We are disconnected");
          })
          .catch((error) => {
            console.log(error);
          });
      });
  })
  .catch((error) => {
    console.log(error);
  });
