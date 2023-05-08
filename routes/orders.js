const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/' , orderController.allOrders);
router.post('/' , orderController.newOrder); //En caso de crear una nueva orden se toma el link entero tambien, o se deberia de asociar a un ID o algo asi?
router.get('/:id', orderController.showOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);


module.exports = router;