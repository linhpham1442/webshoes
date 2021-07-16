const express = require('express');
const Route = express.Router();
const midlleware = require('../../middleware/isLogin');
const { homeController, cartController, userController } = require('../../controllers/web/index');
const validator = require('../../auth/userAuth');
const nodemailer = require("nodemailer");


Route.route('/').get(homeController.home);
Route.route('/about').get(homeController.about);
Route.route('/contact').get(homeController.contact);
Route.route('/blog').get(homeController.blog);
Route.route('/register').get(userController.getRegister).post(validator.addValidator(), userController.postRegister);
Route.route('/login').get(userController.getLogin).post(userController.postLogin);
Route.route('/logout').get(userController.logout);
Route.route('/shop').get(homeController.allproduct);
Route.route('/search').get(homeController.search);
Route.route('/shop/:slug').get(homeController.shop);
Route.route('/product/:slug').get(homeController.single);
Route.route('/addToCart/:slug').get(cartController.addToCart, midlleware.isUser);
Route.route('/cart/update/:slug').get(cartController.getUpdateQty);
Route.route('/cart/clear').get(cartController.clearCart);
Route.route('/checkout').get(cartController.getCart).post(validator.checkoutValidator(), cartController.postCart);
module.exports = Route;