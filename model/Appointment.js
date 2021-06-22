const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaAppointments = new Schema({
    identification: String,
    dateAppointment: String,
    hour: String,
    description: String,
    treatment: String,
    patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],

});

const Appointments = mongoose.model("Appointments", esquemaAppointments);
module.exports = Appointments;