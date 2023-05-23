const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    console.log('User:', user); // Mensaje de depuración
    if (!user) {
      console.log('Email incorrecto.'); // Mensaje de depuración
      return done(null, false, { message: 'Email incorrecto.' });
    }
    if (!user.validPassword(password)) {
      console.log('Contraseña incorrecta.'); // Mensaje de depuración
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    console.log('Deserialized User:', user); // Mensaje de depuración
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login'); // Redirige al usuario al formulario de inicio de sesión si no está autenticado
};

module.exports = { passport, ensureAuthenticated };
