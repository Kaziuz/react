const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')
// obtenemos el id de la tarjeta de credito
// para hacer una pago/carga(charge) con la api de stripe 
// https://stripe.com/docs/api/charges/create?lang=node
// parseando el request del cliente con body-parser

module.exports = app =>  {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // añadimos al stock de credits del usuario 5 creditos
        // tomando una copia de este con req.user
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
}