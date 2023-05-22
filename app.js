const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const passportConfig = require('./config/passport');


// Importa tus modelos de usuario y otros archivos necesarios
const User = require('./models/user'); // Reemplaza 'User' con el nombre de tu modelo de usuario

// Configuración de vistas y middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuración de sesión y flash messages
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Inicialización y configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware de registro de todas las solicitudes
app.use((req, res, next) => {
  console.log('Request:', req.method, req.url, req.body);
  next();
});

// Rutas
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a mi sitio!');
});

// Rutas de productos, órdenes y usuarios
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

// Ruta para servir archivos estáticos (por ejemplo, imágenes subidas)
app.use('/uploads', express.static('uploads'));


module.exports = app;
