const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaAppUser = new Schema({
    identification:String,
    name: String,
    username: String,
    password: String,
    lastname: String,
    age: Number,
    gender: String,
    account: String,
    membershipNumber: Number,
    specialty: String,
    rol: String,
    patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
    
});

const AppUser = mongoose.model("AppUser", esquemaAppUser);
module.exports = AppUser;