const {check} = require('express-validator');

let addValidator = ()=>{
    return [
        check('name').not().isEmpty().withMessage('Vui lòng nhập tên category'),
        check('description').not().isEmpty().withMessage("Vui lòng nhập miêu tả")
    ]
}
let editValidator = ()=>{
    return [
        check('name').not().isEmpty().withMessage('Vui lòng nhập tên category'),
        check('description').not().isEmpty().withMessage("Vui lòng nhập miêu tả")
    ]
}
let validator = {
    addValidator :addValidator,
    editValidator :editValidator
}
module.exports = validator;