const User = require('../models/user');

const userController = {};

// Renderiza la vista con el formulario de registro de usuarios.
userController.signup = async (req, res) => {
    const error = null; // Definimos la variable error
    res.render('users/signup', { error }); // Pasamos la variable a la vista
};

// Crea un nuevo usuario en la base de datos a partir de los datos enviados desde el formulario de registro.
userController.create = async (req, res, next) => {
  const { nombre_usuario, email, contraseña, direccion_envio, ciudad, estado, codigo_postal, pais } = req.body;

  try {
    const user = await User.create({
      nombre_usuario,
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
    next(err);
  }
};

// Renderiza la vista con el formulario de inicio de sesión.
userController.login = (req, res) => {
  res.render('users/login');
};

// Autentica al usuario a partir de las credenciales enviadas desde el formulario de inicio de sesión.
userController.authenticate = async (req, res, next) => {
  const { email, contraseña } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
        contraseña
      }
    });
    if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.render('users/login', { error: 'Invalid email or password.' });
    }
  } catch (err) {
    next(err);
  }
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

module.exports = userController;
