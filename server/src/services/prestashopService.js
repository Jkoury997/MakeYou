const axios = require('axios');
const utils = require("../utils/convertXMLtoJson")
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.PRESTASHOP_API_URL,
  auth: {
    username: process.env.PRESTASHOP_API_KEY,
    password: ''
  }
});

//Products

exports.getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

exports.getProductsById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};


// Orders

exports.getOrder = async () => {
    const response = await api.get('/orders');
    return utils.convertXmlToJson(response.data);
  };
  
  exports.getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return utils.convertXmlToJson(response.data);
  };