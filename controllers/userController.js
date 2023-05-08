const User = require('../models/user');

exports.allUsers = async (req, res) => {
    const users = await User.findAll();
    res.render('users/index', { users : users });
};

exports.onlyUsers = (req, res) => {
    res.send("Mostrando solo el usuario")
};

exports.createUser = (req, res) => {
    res.send("Creando un nuevo usuario")
};

exports.updateUser = (req, res) => {
    res.send("Actualizando usuario")
};

exports.deleteUser = (req, res) => {
    res.send("Eliminando usuario")
};