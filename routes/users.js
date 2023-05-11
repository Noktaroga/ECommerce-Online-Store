const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Renderiza la vista con el formulario de registro de usuarios.
router.get('/signup', userController.signup);

// Crea un nuevo usuario en la base de datos a partir de los datos enviados desde el formulario de registro.
router.post('/signup', userController.create);

// Renderiza la vista con el formulario de inicio de sesión.
router.get('/login', userController.login);

// Autentica al usuario a partir de las credenciales enviadas desde el formulario de inicio de sesión.
router.post('/login', userController.authenticate);

// Cierra la sesión del usuario.
router.get('/logout', userController.logout);

// Renderiza la vista con la lista de usuarios.
router.get('/usuarios', userController.listUsers);


module.exports = router;
