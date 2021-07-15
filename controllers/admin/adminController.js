const userModel = require('../../models/userModel');
const session = require('express-session');
const bcrypt = require('bcrypt');
const page = {
    notFind: '/404',
    index: '/index',

}
module.exports = {
    notFound: async(req, res) => {
        return await res.render("admin/layout/master", {
            content: page.notFind,
            title: "Not found"
        });
    },
    index: async(req, res) => {
        return await res.render("admin/layout/master", {
            content: page.index,
            title: "Dashboard"
        });
    },
    getLogin: async(req, res) => {
        return await res.render("admin/login", {
            title: "Đăng nhập"
        });
    },
    postLogin: async(req, res) => {

        console.log(req);
        let param = req.body;
        let email = param.email;
        let password = param.password;
        try {
            let user = await userModel.findOne({
                email: email,
                isAdmin: [0, 1]
            });
            if (user) {
                let hash = bcrypt.compareSync(password, user.password);
                // hash return true hoặc false
                if (hash) {
                    req.session.user = user;
                    req.flash('success', 'Đăng nhập thành công');
                    // return res.status(200).json({
                    //     data:req.session.user
                    // });
                    console.log(req.session);
                    return res.redirect('/admin/');
                }
                req.flash('error', 'Mật khẩu không chính xác')
                return res.redirect('/admin/login');
            }
            req.flash('error', 'Tài khoản chưa tồn tại');
            return res.redirect('/admin/login');
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    logOut: async(req, res) => {
        req.session.destroy();
        return await res.redirect('/admin/login')
    }
}