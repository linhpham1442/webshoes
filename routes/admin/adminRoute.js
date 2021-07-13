const express = require('express');
const {adminController} = require('../../controllers/admin/index');
const router = express.Router();
const middleware = require('../../middleware/isLogin');

router.route('/').get(middleware.isLogin,adminController.index);
router.route('/login').get(adminController.getLogin).post(adminController.postLogin);
router.route('/logout').get(adminController.logOut);
router.route('/*').get(adminController.notFound);
module.exports = router;