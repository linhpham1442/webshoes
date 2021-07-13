const express = require('express');
const {categoryController} = require('../../controllers/admin/index.js');
const router = express.Router();
const validator = require('../../auth/cateAuth');
const midlleware = require('../../middleware/isLogin');

router.route('/').get(midlleware.isLogin,categoryController.index);
router.route('/add').get(midlleware.isLogin,categoryController.getAdd).post(validator.addValidator(),categoryController.postAdd);
router.route('/edit/:id').get(midlleware.isLogin,categoryController.getEdit).post(validator.addValidator(),categoryController.postEdit);
router.route('/delete/:id').get(midlleware.isLogin,categoryController.delete);

module.exports = router;