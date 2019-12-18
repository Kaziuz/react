// este middleware se encarga de 
// detener el flujo de navegacion
// si el usuario no esta logueado

module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({ error: 'you must log in!' });
    }

    next();
};