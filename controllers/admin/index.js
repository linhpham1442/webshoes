const productController = require('./productController');
const categoryController = require('./categoryController');
const userController = require('./userController');
const adminController = require('./adminController');
const invoiceController = require('./invoiceController');
module.exports ={
    productController : productController,
    categoryController : categoryController,
    userController : userController,
    adminController : adminController,
    invoiceController : invoiceController
}