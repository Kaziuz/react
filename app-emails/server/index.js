const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require("./config/keys");
require("./models/User"); // mongo es informado de que debe crear una collection de usuarios
require("./services/passport"); // se ejecutan estartegias de google para login

// conectamos con la base de datos
mongoose.connect(keys.mongoURI);

const app = express();

// usamos un middleware que opera
// en la solicitud entrante antes de enviarlo
// a nuestro manejador de routes
app.use(bodyParser.json());

// le decimos a nuestra aplicacion
// que necesita hacer uso de cookies
app.use(
  cookieSession({ // middleware
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias habilitada la cookie
    keys: [keys.cookieKey] // seguridad para la cookie
  })
);

// le decimos a passport que debe 
// hacer uso de las cookies para manejar
// la autenticación
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
authRoutes(app);

const billingRoutes = require("./routes/billingRoutes");
billingRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/*
un middleware es una función que se encarga en este caso
de tomar las solicitudes entrantes y procesarlas antes de que
sean enviadas a los diferentes routes
*/