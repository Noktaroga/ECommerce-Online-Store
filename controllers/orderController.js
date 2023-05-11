const Order = require('../models/order');

const orderController = {};

// Función para mostrar la vista de creación de órdenes
orderController.showCreateOrder = async (req, res) => {
  try {
    res.render('orders/create');
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error al mostrar la vista de creación de órdenes' });
  }
};

// Función para crear una nueva orden
orderController.createOrder = async (req, res) => {
  try {
    const { id_usuario, fecha_pedido, total, direccion_envio, estado_pedido, fecha_actualizacion, id_carrito } = req.body;
    const newOrder = await Order.create({
      id_usuario,
      fecha_pedido,
      total,
      direccion_envio,
      estado_pedido,
      fecha_actualizacion,
      id_carrito
    });
    res.json({ success: true, message: 'Orden creada exitosamente', order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error al crear la orden' });
  }
};

// Función para mostrar la vista de órdenes de un usuario
orderController.showListOrders = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const orders = await Order.findAll({ where: { id_usuario } });
    res.render('orders/list', { orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error al mostrar la vista de órdenes de un usuario' });
  }
};

// Función para mostrar la vista de actualización de órdenes
orderController.showUpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    res.render('orders/update', { order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error al mostrar la vista de actualización de órdenes' });
  }
};

// Función para actualizar el estado de una orden
orderController.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_pedido, fecha_actualizacion } = req.body;
    const updatedOrder = await Order.update(
      { estado_pedido, fecha_actualizacion },
      { where: { id } }
    );
    res.json({ success: true, message: 'Estado de orden actualizado exitosamente', order: updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error al actualizar el estado de la orden' });
  }
};

module.exports = orderController;