const passport = require('passport');
const userModel = require('../../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const usersPage = {
    register: 'register'
}

let getRegister = async(req, res) => {
    try {
        return res.render('web/layout/master', {
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
            return res.render('web/layout/master', {
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

// let postRegister = async(req, res) => {

//     let param = req.body;
//     const hash = bcrypt.hashSync(param.password, 10)
//     let data = {
//             email: param.email,
//             name: param.name,
//             username: param.username,
//             address: param.address,
//             phone: param.phone,
//             password: hash,
//             isAdmin: 1,
//             isDeleted: 0
//         }
//         // let password = param.password;
//         // let password2 = param.password2;
//         // check('name', 'Bạn cần nhập họ tên!').not().isEmpty();
//         // check('email', 'Bạn cần nhập email!').isEmail();
//         // check('username', 'Bạn cần nhập tên đăng nhập!').not().isEmpty();
//         // check('password', 'Bạn cần nhập mật khẩu!').not().isEmpty();
//         // check('password2', 'Mật khẩu vừa nhập không khớp!').equals(password);

//     const errors = validationResult(req);
//     try {
//         if (!errors.isEmpty()) {
//             return res.render('admin/layout/master', {
//                 content: usersPage.register,
//                 title: "Đăng kí",
//                 errors: errors.array(),
//             });
//         } else {
//             let user = await userModel.findOne({ email: data.email });
//             let un = await userModel.findOne({ username: data.username });
//             if (user != null) {
//                 req.flash('error', "Tài khoản đã tồn tại. Vui lòng sử dụng email khác");
//                 return res.redirect("/register");
//             } else if (un != null) {
//                 req.flash('error', "Tài khoản đã tồn tại. Vui lòng sử dụng tên đăng nhập khác");
//                 return res.redirect("/register");
//             } else {
//                 await userModel.create(data);
//                 req.flash('success', 'Thêm tài khoản thành công');
//                 return res.redirect('/login')
//             }
//         }
//     } catch (error) {
//         return res.status(500).json({
//             type: "Error",
//             msg: error
//         })
//     }
// }


module.exports = {
    getRegister: getRegister,
    postRegister: postRegister
}