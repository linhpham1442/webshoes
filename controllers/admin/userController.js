const userModel = require('../../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userPage = {
    index: 'user/index',
    add: 'user/add',
    edit: 'user/edit'
}
let index = async(req, res) => {
    try {
        let users = await userModel.find({ isDeleted: 0 });
        return res.render('admin/layout/master', {
            content: userPage.index,
            data: users,
            title: "Người dùng"
        })
    } catch (err) {
        return res.status(500).json(err);
    }
}
let getAdd = async(req, res) => {
    try {
        return await res.render('admin/layout/master', {
            content: userPage.add,
            data: '',
            title: "Thêm người dùng"
        })
    } catch (err) {
        return res.status(500).json(err);
    }
}
let postAdd = async(req, res) => {
    let param = req.body;
    const errors = validationResult(req);
    const hash = bcrypt.hashSync(param.password, 10)
    let data = {
        email: param.email,
        name: param.name,
        address: param.address,
        phone: param.phone,
        password: hash,
        isAdmin: param.power,
        isDeleted: 0
    }

    try {
        if (!errors.isEmpty()) {
            return res.render('admin/layout/master', {
                content: userPage.add,
                errors: errors.array(),
            });
        }
        let user = await userModel.findOne({ email: data.email });
        if (user != null) {
            req.flash('error', "Tài khoản đã tồn tại. Vui lòng sử dụng email khác");
            return res.redirect("/admin/user/add");
        } else {
            await userModel.create(data);
            req.flash('success', 'Thêm user thành công');
            return res.redirect('/admin/user/')
        }
    } catch (error) {
        return res.status(500).json({
            type: 'erorr',
            msg: error
        })
    }
}
let getEdit = async(req, res) => {
    try {
        let result = await userModel.findOne({ _id: req.params.id });
        if (result == null) {
            return res.render('admin/layout/master', {
                content: '/404',
                data: '',
                title: "404"
            })
        }
        return res.render('admin/layout/master', {
            content: userPage.edit,
            data: result,
            title: "Chỉnh sửa gười dùng"
        })
    } catch (err) {
        return res.status(500).json({
            type: "error",
            msg: err
        })
    }
}
let postEdit = async(req, res) => {
    let param = req.body;
    let data = {
        name: param.name,
        address: param.address,
        phone: param.phone,
        isAdmin: param.power,
    }
    const hash = bcrypt.hashSync(param.password, 10)
    if (param.password != null) {
        data.password = hash;
    }
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.render('admin/layout/master', {
                content: userPage.add,
                errors: errors.array(),
                title: "Chỉnh sửa người dùng"
            });
        }
        await userModel.updateOne({ _id: req.params.id }, data);
        req.flash('success', 'Sửa người dùng thành công');
        return res.redirect('/admin/user/');
    } catch (error) {
        return res.status(500).json({
            type: 'erorr',
            msg: error
        })
    }
}
let _delete = async(req, res) => {
    try {
        await userModel.deleteOne({ _id: req.params.id });
        return res.redirect('/admin/user');
    } catch (error) {
        return res.status(500).json({
            type: "error",
            msg: error
        })
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