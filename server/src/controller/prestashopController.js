const prestashopService = require('../services/prestashopService');

//PRODUCT

exports.productList = async (req, res) => {
  try {
    const productos = await prestashopService.getProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.productById = async (req, res) => {
  try {
    const producto = await prestashopService.getProductsById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Orders

exports.orderList = async (req, res) => {
    
    try {
      const pedidos = await prestashopService.getOrder();
      res.json(pedidos);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  exports.orderById = async (req, res) => {
    try {
      const pedido = await prestashopService.getOrderById(req.params.id);
      if (pedido) {
        res.json(pedido);
      } else {
        res.status(404).send('Pedido no encontrado');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };