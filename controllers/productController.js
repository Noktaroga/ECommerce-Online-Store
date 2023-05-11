const Product = require('../models/product');

const productController = {
  list: async (req, res) => {
    const products = await Product.findAll();
    res.render('products/list', { products });
  },

  create: (req, res) => {
    res.render('products/create');
  },

  store: async (req, res) => {
    const { nombre_producto, precio, descripcion } = req.body;
    if (!nombre_producto || !precio || !descripcion) {
      let message = 'Faltan los siguientes campos: ';
      if (!nombre_producto) message += 'nombre_producto, ';
      if (!precio) message += 'precio, ';
      if (!descripcion) message += 'descripcion, ';
      message = message.slice(0, -2); // Elimina la coma final
      return res.status(400).json({ message });
    }
    const product = await Product.create({
      nombre_producto,
      precio,
      descripcion
    });
    res.redirect(`/products/${product.id}`);
  },

  show: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.render('products/detail', { product });
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('EDIT request:', req.params);
      const product = await Product.findByPk(id);
      console.log('EDIT response:', product);
      res.render('products/edit', { product });
    } catch (error) {
      console.log(error);
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_producto, precio, descripcion } = req.body;
      console.log('UPDATE request:', req.body);
    
      if (!nombre_producto || !precio || !descripcion) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }
    
      const productToUpdate = await Product.findByPk(id);
      productToUpdate.nombre_producto = nombre_producto;
      productToUpdate.precio = precio;
      productToUpdate.descripcion = descripcion;
      await productToUpdate.save();
      console.log('UPDATE response:', productToUpdate);
      res.redirect(`/products/${productToUpdate.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  ,

  delete: async (req, res) => {
    const { id } = req.params;
    const productToDelete = await Product.findByPk(id);
    await productToDelete.destroy();
    res.redirect('/products');
  },
};

module.exports = productController;
