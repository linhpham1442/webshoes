const express = require('express');
const router = express.Router();
const {productController} = require('../../controllers/admin/index');
const validator = require('../../auth/productAuth');
const midlleware = require('../../middleware/isLogin');
const multer = require('multer');
var storage=multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'public/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
const upload = multer({ storage: storage});
router.route('/').get(productController.index);
router.route('/add').get(productController.getAdd).post(upload.single('image'),validator.addValidator(),productController.postAdd);
router.route('/edit/:id').get(productController.getEdit).post(upload.single('image'),validator.editValidator(),productController.postEdit);
router.route('/delete/:id').get(productController.delete);

module.exports = router;