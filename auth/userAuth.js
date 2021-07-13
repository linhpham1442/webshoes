const {check,sanitizeBody } = require('express-validator');

let addValidator = ()=>{
    return [
        check('email').not().isEmpty().withMessage('Vui lòng nhập email').isEmail().withMessage('Định dạng email không chính xác'),
        check('name').not().isEmpty().withMessage('Vui lòng điền username !').isLength({min:6}).withMessage("Username phải gồm 6 kí tự trở lên !"),
        check('address').not().isEmpty().withMessage("Vui lòng nhập địa chỉ !"),
        check('phone').not().isEmpty().withMessage("Vui lòng nhập số điện thoại !"),
        check('password').not().isEmpty().withMessage('Vui lòng nhập mật khẩu !'),
        check('repassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                  throw new Error('Mật khẩu không khớp');
             }
             return true;
        })
    ]
};
let editValidator = ()=>{
    return [
        check('name').not().isEmpty().withMessage('Vui lòng điền username !').isLength({min:6}).withMessage("Username phải gồm 6 kí tự trở lên !"),
        check('address').not().isEmpty().withMessage("Vui lòng nhập địa chỉ !"),
        check('phone').not().isEmpty().withMessage("Vui lòng nhập số điện thoại !"),
        check('repassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                  throw new Error('Mật khẩu không khớp');
             }
             return true;
        })
    ]
}

let validator = {
    addValidator:addValidator,
    editValidator:editValidator
}
module.exports = validator;