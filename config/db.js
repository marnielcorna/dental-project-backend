require('dotenv').config();
const mongoose = require("mongoose");
// mongoose.set('useFindAndModify', false); 


  mongoose
  .connect(
    `mongodb+srv://${process.env.USER_ID}:${process.env.PASSWORD_ID}@dental.9t90j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
  )
  .then((x) => {
    console.log(
      `Conectado a la base de datos: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error al conectar con Mongo", err);
  });





