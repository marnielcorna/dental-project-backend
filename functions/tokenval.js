require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../model/Appuser");

let tokenValidation = async (response, token) => {
    let validationResult = {};
    if(!token){
        response.send({
            auth: false,
            token:null,
            message: "Not Valid Token"
        });
        return;
    }
    try {
        validationResult = jwt.verify(token, process.env.SECRET_WORD);
    } catch (error){
        response.send({
            auth:false,
            token: null,
            message:"Not Valid Token."
        });
        return;
    }
    let user = await User.findById(validationResult.id, {password:0}).then((userFound)=>{
        return userFound;
    });
    console.log(user);
    // if (!user) {
    //     response.send({
    //         auth: false,
    //         message: "User does not exist."
    //     });
    //     return;
    // };
    // return user;

};

module.exports = tokenValidation;