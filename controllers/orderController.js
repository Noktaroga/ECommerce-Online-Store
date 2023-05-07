const Order  = require('../models/order');

exports.allOrders = async (req, res) => { 
    const orders = await Order.findAll();
    res.render('orders/index', { orders: orders });
};

exports.newOrder = (req, res) => { 
    res.send('Nueva orden');
};

exports.showOrder = async (req, res) => { 

    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    res.render('orders/show', { order });
};

exports.updateOrder = (req, res) => { 
    res.send('Actualizando la orden con id'+ req.params.id);
};

exports.deleteOrder = (req, res) => { 
    res.send('Borrando la orden con id'+ req.params.id);
};

