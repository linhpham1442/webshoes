const passport = require('passport');
const userModel = require('../../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const usersPage = {
    register: 'register',
    login: 'login'
}

let getRegister = async(req, res) => {
    try {
        return res.render('web/layout/userlayout', {
            content: usersPage.register,
            title: "Đăng kí"
        })
    } catch (error) {
        return res.status(500).json({
            type: "Error",
            msg: error
        })
    }
}

let postRegister = async(req, res) => {
    let param = req.body;
    const errors = validationResult(req);
    const hash = bcrypt.hashSync(param.password, 10)
    let data = {
        email: param.email,
        name: param.name,
        address: param.address,
        phone: param.phone,
        password: hash,
        isAdmin: 2,
        isDeleted: 0
    }

    try {
        if (!errors.isEmpty()) {
            return res.render('web/layout/userlayout', {
                content: usersPage.register,
                errors: errors.array(),
                title: "Đăng kí"
            });
        }
        let user = await userModel.findOne({ email: data.email });
        if (user != null) {
            req.flash('error', "Tài khoản đã tồn tại. Vui lòng sử dụng email khác");
            return res.redirect("/register");
        } else {
            await userModel.create(data);
            req.flash('success', 'Thêm user thành công');
            return res.redirect('/login')
        }
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            msg: error
        })
    }
}

let getLogin = async(req, res) => {
    try {
        if (res.locals.user) res.redirect('/')
        return res.render('web/layout/userlayout', {
            content: usersPage.login,
            title: "Đăng nhập"
        })
    } catch (error) {
        return res.status(500).json({
            type: "Error",
            msg: error
        })
    }
}

let postLogin = async(req, res, next) => {
    // // let password = param.password;
    // passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // })(req, res, next);
    // let param = req.body;
    // let email = param.email;
    // let password = param.password;
    try {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
        // let user = await userModel.findOne({
        //     email: email
        // });
        // if (user) {
        //     let hash = bcrypt.compareSync(password, user.password);
        //     // hash return true hoặc false
        //     if (hash) {
        //         req.session.user = user;
        //         req.flash('success', 'Đăng nhập thành công');
        //         // return res.status(200).json({
        //         //     data:req.session.user
        //         // });
        //         console.log(req.session);
        //         return res.redirect('/');
        //     }
        //     req.flash('error', 'Mật khẩu không chính xác')
        //     return res.redirect('/login');
        // }
        // req.flash('error', 'Tài khoản chưa tồn tại');
        // return res.redirect('login');
    } catch (err) {
        return res.status(500).json(err);
    }

}
let logout = async(req, res) => {
    // req.session.destroy();
    req.logout()
    req.flash('success', 'Đăng xuất thành công!')
    return await res.redirect('/')
}
module.exports = {
    getRegister: getRegister,
    postRegister: postRegister,
    getLogin: getLogin,
    postLogin: postLogin,
    logout: logout
}