const categoryModel = require('../../models/categoryModel');
const slug = require('slug');
const { validationResult } = require('express-validator');
const catePage = {
    index: 'cate/index',
    add: 'cate/add',
    edit: 'cate/edit'
}
module.exports = {
    index: async(req, res) => {
        try {
            let result = await categoryModel.find();
            return res.render('admin/layout/master', {
                content: catePage.index,
                data: result,
                title: "Trang chủ"
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getAdd: async(req, res) => {
        return res.render('admin/layout/master', {
            content: catePage.add,
            data: '',
            title: "Thêm danh mục"
        });
    },
    postAdd: async(req, res) => {
        let param = req.body;
        let errors = validationResult(req);
        let data = {
            name: param.name,
            slug: slug(param.name, '-'),
            description: param.description,
            isDeleted: 0
        }
        try {
            if (!errors.isEmpty()) {
                let error = errors.array();
                let data = param;
                return res.render('admin/layout/master', {
                    content: catePage.add,
                    errors: error,
                    data: data,
                    title: "Thêm danh mục"
                });
            };
            await categoryModel.create(data);
            req.flash('success', 'Thêm danh mục thành công');
            return res.redirect('/admin/cate/');
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getEdit: async(req, res) => {
        let id = req.params.id;
        try {
            let result = await categoryModel.findOne({ _id: id });
            if (result === null) {
                return res.render('/admin/404');
            }
            return res.render('admin/layout/master', {
                content: catePage.edit,
                data: result,
                title: "Chỉnh sửa danh mục"
            });
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    postEdit: async(req, res) => {
        let param = req.body;
        let data = {
            name: param.name,
            slug: slug(param.name, '-'),
            description: param.description
        };
        let id = req.params.id;
        let errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                let error = errors.array();
                let data = param;
                data._id = id;
                return res.render('admin/layout/master', {
                    content: catePage.edit,
                    errors: error,
                    data: data,
                    title: "Chỉnh sửa danh mục"
                });
            }
            await categoryModel.updateOne({ _id: id }, { $set: data });
            req.flash('success', 'Sửa danh mục thành công');
            return res.redirect('/admin/cate/');
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    delete: async(req, res) => {
        let id = req.params.id;
        try {
            let findCate = await categoryModel.deleteOne({ _id: id });
            await categoryModel.updateOne({ _id: id }, { $set: { isDeleted: 1 } });
            if (findCate === null) {
                return res.render('admin/404', {
                    title: "404"
                });
            }
            return res.redirect('/admin/cate/');
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}