const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaAppointment = new Schema({
    identification: String,
    dateAppointment: String,
    hour: String,
    description: String,
    treatment: String,
    patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],

});

const Appointment = mongoose.model("Appointment", esquemaAppointment);
module.exports = Appointment;