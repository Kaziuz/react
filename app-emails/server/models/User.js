const mongoose = require("mongoose");
const { Schema } = mongoose;

// definimos el esquema para cada registro de usuario,
// creando la collection of users para mongo

// este squema de objeto puede recibir el tipo del campo y un valor inicial
// como se hace con el key credits
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// nombre de la colletion y el esquema
mongoose.model("users", userSchema);
