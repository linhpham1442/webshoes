const { check } = require('express-validator');
const Product = require('../models/productModel');
let addValidator = () => {
    return [
        check('name').not().isEmpty().withMessage('Vui lòng điền tên sản phẩm'),
        // check('name').custom(value => {
        //     return Product.find({ name: value }).then(result => {
        //         if (result) {
        //             throw new Error("Sản phẩm đã tồn tại");
        //         }
        //     });
        // }),
        check('price').not().isEmpty().withMessage('Vui lòng nhập giá sản phẩm'),
        check('sale').not().isEmpty().withMessage('Vui lòng nhập giá Sale'),
        check('description').not().isEmpty().withMessage('Vui lòng nhập miêu tả sản phẩm')
    ]
}
let editValidator = () => {
    return [
        check('name').not().isEmpty().withMessage('Vui lòng điền tên sản phẩm'),
        check('price').not().isEmpty().withMessage('Vui lòng nhập giá sản phẩm'),
        check('sale').not().isEmpty().withMessage('Vui lòng nhập giá Sale'),
        check('description').not().isEmpty().withMessage('Vui lòng nhập miêu tả sản phẩm')
    ]
}
module.exports = {
    addValidator: addValidator,
    editValidator: editValidator
}