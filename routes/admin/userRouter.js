const express = require('express');
const router = express.Router();
const {userController} = require('../../controllers/admin/index');
const validator = require('../../auth/userAuth');
const midlleware = require('../../middleware/isLogin');

router.route('/').get(midlleware.isLogin,userController.index);
router.route('/add').get(midlleware.isLogin,userController.getAdd).post(validator.addValidator(),userController.postAdd);
router.route("/edit/:id").get(midlleware.isLogin,userController.getEdit).post(validator.editValidator(),userController.postEdit);
router.route("/delete/:id").get(midlleware.isLogin,midlleware.isLogin,userController.delete);

module.exports = router;