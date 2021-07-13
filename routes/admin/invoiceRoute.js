const express = require('express');
const router = express.Router();
const {invoiceController} = require('../../controllers/admin/index');
const validator = require('../../auth/userAuth');
const midlleware = require('../../middleware/isLogin');

router.route('/').get(midlleware.isLogin,invoiceController.index);
router.route('/detail/:id').get(midlleware.isLogin,invoiceController.detail)

module.exports = router;