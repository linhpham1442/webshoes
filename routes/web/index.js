const expres= require('express');
const route = expres.Router();
const homeRoute = require('./homeRoute');
route.use('/',homeRoute);

module.exports = route;