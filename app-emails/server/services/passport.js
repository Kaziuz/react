const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// importo la collection of users
const User = mongoose.model("users");

// serializamos el usuario,
// ese user es lo que sacamos de la base de datos
// y tomamos ese modelo de usuario
// para generar alguna informacion de identificación (cookie)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializamos el usuario
// aqui se trata entonces de tomar
// ese modelo de usuario que habiamos creado
// previamente con serializeUser
// y convertirlo en un usuario real
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// estrategia para google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // ruta donde se enviará al usuario después de otorgar permisos a la aplicacion
      // osea vendría a ser http://localhost:5000/auth/google/callback
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      /*
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile .!.', profile);
        */

      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        // pasamos un null como res done y el argumento de la respuesta
         return done(null, existingUser);
      }

      // we don't have a user record with this ID,
      // make a new records
      // cuando los servers de google responden
      const user = await new User({ googleId: profile.id }).save() // creamos una instanacia de ese objeto
      done(null, user); // trabajamos con el usuario que vuelve en la respuesta asincrona
    }
  )
);
