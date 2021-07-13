const express = require('express');
const userRoute = require('./userRouter');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const adminRoute = require('./adminRoute');
const invoiceRoute = require('./invoiceRoute');
const router = express.Router();

router.use("/admin/user",userRoute);
router.use("/admin/cate",categoryRoute);
router.use("/admin/product",productRoute);
router.use("/admin/invoice",invoiceRoute);
router.use('/admin',adminRoute);

module.exports = router;