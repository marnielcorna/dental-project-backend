const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaAppointments = new Schema({
    
    dateAppointment: String,
    hour: String,
    description: String,
    treatment: String,
    
});

const Appointments = mongoose.model("Appointments", esquemaAppointments);
module.exports = Appointments;