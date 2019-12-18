// aqui nos refereimos a la libreria no al archivo
const passport = require("passport"); 

module.exports = app => {
  // autenticamos al usuario que entre por esta ruta para la estrategia de google,
  // donde los servidores de google nos responden con data de ese usario
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"] // le decimos a google que nos de el profile y el email
    })
  );

  // manejamos la respuesta de los servidores de google después de que
  // el usuario conceda acceso a nuestra app
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // redireccionamos de vuelta al sitio
      res.redirect("/surveys");
    }
  );

  // para que el usuario pueda cerrar sesión
  app.get("/api/logout", (req, res) => {
    req.logout();
    // res.send(req.user);
    res.redirect("/");
  });

  // probando el res del currentUser
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
