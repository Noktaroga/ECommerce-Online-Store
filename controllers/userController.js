const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { ensureAuthenticated } = require('../config/passport');


const userController = {};

// Renderiza la vista con el formulario de registro de usuarios.
userController.signup = async (req, res) => {
  const error = req.flash('error')[0]; // Recupera el mensaje flash de error, si existe
  res.render('users/signup', { error });
};

// Crea un nuevo usuario en la base de datos a partir de los datos enviados desde el formulario de registro.
userController.create = async (req, res, next) => {
  const { nombre_usuario, nombre, email, contraseña, direccion_envio, ciudad, estado, codigo_postal, pais } = req.body;

  try {
    const user = await User.create({
      nombre_usuario,
      nombre,
      email,
      contraseña,
      direccion_envio,
      ciudad,
      estado,
      codigo_postal,
      pais
    });
    res.redirect('/users/signup');
  } catch (err) {
    console.error(err); // Agrega esta línea para mostrar el error en la consola
    next(err);
  }
};

// Renderiza la vista con el formulario de inicio de sesión.
userController.login = (req, res) => {
  const error = req.flash('error')[0]; // Recupera el mensaje flash de error, si existe
  res.render('users/login', { error });
};

// Autentica al usuario a partir de las credenciales enviadas desde el formulario de inicio de sesión.
userController.authenticate = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', 'Email o contraseña incorrectos.');
      req.flash('email', req.body.email);
      console.log('Autenticación fallida:', info); // Agrega este console.log para mostrar el mensaje de error
      return res.redirect('/users/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('Usuario autenticado:', user); // Agrega este console.log para mostrar el usuario autenticado
      res.redirect('/users/profile/');
    });
  })(req, res, next);
};


// Cierra la sesión del usuario.
userController.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

userController.listUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll({});
    res.render('users/usuarios', { usuarios });
  } catch (error) {
    console.log(error);
  }
};

userController.profile = async (req, res) => {
  try {
    // Verificar la autenticación antes de mostrar la página de perfil
    if (req.isAuthenticated()) {
      const userId = req.user.id; // Obtén el ID del usuario autenticado desde la sesión
      const user = await User.findByPk(userId); // Busca el usuario en la base de datos por su ID
      if (user) {
        res.render('users/profile', { user }); // Renderiza la vista de perfil con los datos del usuario encontrado
      } else {
        // Si no se encuentra el usuario, puedes redirigir a una página de error o manejarlo de otra forma
        res.redirect('/error');
      }
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      res.redirect('/users/login');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};
// ...

module.exports = userController;

