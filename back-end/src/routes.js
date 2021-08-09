const express = require('express');

const users = require('./controllers/users');
const products = require('./controllers/products');

const authToken = require('./middlewares/authToken');

const routes = express();

// Users
routes.post('/cadastro', users.register);
routes.post('/login', users.login);

routes.use(authToken);
routes.get('/perfil', users.viewProfile);
routes.put('/perfil', users.updateProfile);

// Product
routes.get('/produtos', products.getAllProducts);
routes.get('/produtos/:id', products.getProduct);
routes.post('/produtos', products.registerProduct);
routes.put('/produtos/:id', products.updateProduct);
routes.delete('/produtos/:id', products.deleteProduct);

module.exports = routes;