const Product  = require('../models/product');

exports.index = async (req, res) => {
    // Aquí se manejará la ruta /products
    const products = await Product.findAll();
    res.render('products/index', { products: products });
  };
  
  exports.show = (req, res) => {
    // Aquí se manejará la ruta /products/:id
    res.send(`Mostrando el producto con id ${req.params.id}`);
  };
  
  exports.edit = (req, res) => {
    // Aquí se manejará la ruta /products/:id/edit
    res.send(`Editando el producto con id ${req.params.id}`);
  };
  
  exports.new = (req, res) => {
    // Aquí se manejará la ruta /products/new
    res.send('Mostrando formulario para crear un nuevo producto');
  };
