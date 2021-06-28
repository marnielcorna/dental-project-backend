const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaPatient = new Schema({
    identification:String,
    name: String,
    Lastname: String,
    age: String,
    gender: String,
    phone: String,
    address: String,
    city: String,
    postalcode: String,
    appointment: [{ type: Schema.Types.ObjectId, ref: "Appointment"}]
    
});

const Patient = mongoose.model("Patient", esquemaPatient);
module.exports = Patient;