const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user', attributes: ['nombre'] },
        { model: Product, as: 'products', attributes: ['nombre_producto'] }
      ]
    });

    // Imprimir los nombres de los productos en cada orden
    orders.forEach((order) => {
      console.log('Productos de la Orden', order.id);
      order.products.forEach((product) => {
        console.log('Nombre del Producto:', product.nombre_producto);
      });
    });

    res.render('orders/orders', { orders });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: { model: Product, as: 'products' } });
    res.render('orders/order-detail', { order });
  } catch (error) {
    console.log(error);
  }
};

exports.getEditOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [{ model: User, as: 'orders' }, { model: Product }]
    });
    const users = await User.findAll();
    const products = await Product.findAll();
    res.render('orders/edit', { order, users, products });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { userId, productId, cantidad, direccion_envio } = req.body;
    const order = await Order.findByPk(orderId, {
      include: [{ model: User, as: 'orders' }, { model: Product }]
    });
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    await order.update({
      cantidad,
      direccion_envio
    });
    await order.setProducts([product]);
    await order.setUser(user);
    res.redirect('/orders/' + orderId);
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    await order.destroy();
    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
};
