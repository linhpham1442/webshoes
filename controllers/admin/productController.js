const productModel = require('../../models/productModel');
const cateModel = require('../../models/categoryModel');
const slug = require('slug');
const fs = require('fs');
const { validationResult } = require('express-validator');
// const session = require('express-session');
const productPage = {
        index: "product/index",
        add: "product/add",
        edit: "product/edit"
    }
    // index product
let index = async(req, res) => {
    try {
        let result = await productModel.find();
        let cate = await cateModel.find({ isDeleted: 0 });
        return res.render('admin/layout/master', {
            content: productPage.index,
            data: result,
            cate: cate,
            title: "Sản phẩm"
        });
    } catch (err) {
        return res.status(500).json({
            type: 'error',
            message: err
        });
    }
};
// function get add product
let getAdd = async(req, res) => {
    try {
        let cate = await cateModel.find({ isDeleted: 0 });
        return res.render('admin/layout/master', {
            content: productPage.add,
            cate: cate,
            title: "Thêm sản phẩm"
        });
    } catch (err) {
        return res.status(400).json({
            type: 'error',
            message: err
        });
    }
};
// function post add product
let postAdd = async(req, res) => {
    let param = req.body;
    // return console.log(param.popular);
    let data = {
        name: param.name,
        slug: slug(param.name, '_'),
        price: param.price,
        sale: param.sale,
        description: param.description,
        cateId: param.category,
        isDeleted: 0
    }
    data.popular = (param.popular == "popular") ? 1 : 0;
    data.hot = (param.top == "top") ? 1 : 0;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array();
        let data = param;
        let cate = await cateModel.find({ isDeleted: 0 });
        return res.render('admin/layout/master', {
            content: productPage.add,
            data: data,
            errors: errors,
            cate: cate,
            title: "Thêm sản phẩm"
        })
    }
    if (req.file) {
        var img = fs.readFileSync("./public/uploads/" + req.file.filename);
        var encode_image = img.toString('base64');
        data.image = {
            data: Buffer.from(encode_image, 'utf8'),
            contentType: req.file.mimetype,
        };
    }
    try {
        await productModel.create(data);
        req.flash('success', 'Thêm sản phẩm thành công');
        return res.redirect('/admin/product');
    } catch (err) {
        return res.status(400).json({
            type: 'error',
            message: err,
        });
    }
};
// function get edit product
let getEdit = async(req, res) => {
    let id = req.params.id;
    try {
        let result = await productModel.findOne({ _id: id });
        if (result === null) {
            return res.render('admin/404', {
                title: "404"
            });
        }
        let cate = await cateModel.find({ isDeleted: 0 });
        return res.render('admin/layout/master', {
            content: productPage.edit,
            data: result,
            cate: cate,
            title: "Chỉnh sửa đơn hàng"
        });
    } catch (err) {
        return res.status(400).json({
            type: "error",
            message: err
        });
    }
};
// function post edit product
let postEdit = async(req, res) => {
    let param = req.body;
    let id = req.params.id;
    let cate = await cateModel.find({ isDeleted: 0 });
    let data = {
        name: param.name,
        price: param.price,
        sale: param.sale,
        description: param.description,
        cateId: param.category
    }
    data.popular = (param.popular == "popular") ? 1 : 0;
    data.hot = (param.top == "top") ? 1 : 0;
    let errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            errors = errors.array();
            let data = param;
            data._id = id;
            return res.render('admin/layout/master', {
                content: productPage.edit,
                cate: cate,
                data: data,
                errors: errors,
                title: "Chỉnh sửa đơn hàng"
            });
        }
        await productModel.updateOne({ _id: id }, { $set: data });
        req.flash('success', 'Sửa product thành công');
        return res.redirect('/admin/product/');
    } catch (err) {
        return res.status(400).json(err);
    }
};
// function delete
let _delete = async(req, res) => {
    let id = req.params.id;
    try {
        let foundProduct = await productModel.deleteOne({ _id: id });
        if (foundProduct === null) {
            return res.render('admin/404', {
                title: "404"
            });
        }
        await productModel.updateOne({ _id: id }, { $set: { isDeleted: 1 } });
        return res.redirect('/admin/product/');
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    index: index,
    getAdd: getAdd,
    postAdd: postAdd,
    getEdit: getEdit,
    postEdit: postEdit,
    delete: _delete

}