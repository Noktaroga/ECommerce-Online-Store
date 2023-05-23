const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const passport = require('passport');

// Función para calcular el total del carrito
exports.calculateTotal = (cartItems) => {
    let total = 0;
    for (const item of cartItems) {
        total += item.precio * (item.cartItem?.cantidad || 0);
    }
    return total;
};

exports.getCart = async (req, res, next) => {
    try {
        const user = req.user;
        const cart = await Cart.findOne({ where: { userId: user.id } });
        const cartItems = await cart.getProducts();

        res.render('cart/cart', { cartItems, calculateTotal: exports.calculateTotal });
    } catch (error) {
        next(error);
    }
};
  
exports.postAddToCart = async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.redirect('/users/login');
      }
  
      const { productId, cantidad } = req.body;
  
      const product = await Product.findByPk(productId);
      if (!product) {
        req.flash('error', 'El producto seleccionado no existe.');
        return res.redirect('/products');
      }
  
      let cart = await Cart.findOne({ where: { userId: req.user.id } });
      if (!cart) {
        cart = await Cart.create({ userId: req.user.id });
      }
  
      const cartItem = await cart.addProduct(product, { through: { cantidad } });
  
      res.redirect('/cart');
    } catch (error) {
      next(error);
    }
  };
  
exports.postRemoveFromCart = async (req, res, next) => {
  try {
    const user = req.user; // Obtener el usuario autenticado
    const { productId } = req.body;

    const product = await Product.findByPk(productId);
    const cart = await Cart.findOne({ where: { userId: user.id } });

    await cart.removeProduct(product);

    res.redirect('/cart');
  } catch (error) {
    next(error);
  }
};

exports.postClearCart = async (req, res, next) => {
  try {
    const user = req.user; // Obtener el usuario autenticado
    const cart = await Cart.findOne({ where: { userId: user.id } });

    await cart.setProducts([]);

    res.redirect('/cart');
  } catch (error) {
    next(error);
  }
};

exports.getCheckout = async (req, res, next) => {
  try {
    const user = req.user; // Obtener el usuario autenticado
    const cart = await Cart.findOne({ where: { userId: user.id } });
    const products = await cart.getProducts();

    // Agregar los encabezados de desactivación de la caché
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    res.render('cart/checkout', { cart, products });
  } catch (error) {
    next(error);
  }
};

exports.postPlaceOrder = async (req, res, next) => {
  try {
    const user = req.user; // Obtener el usuario autenticado
    const cart = await Cart.findOne({ where: { userId: user.id } });
    const products = await cart.getProducts();

    // Lógica para crear la orden a partir del carrito y guardarla en la base de datos

    res.redirect('/orders');
  } catch (error) {
    next(error);
  }
};

