const session = require('express-session');
module.exports = {
    isLogin: async(req, res, next) => {
        let user = req.session.user;
        try {
            if (user) {
                return next();
            }
            req.flash('error', 'Vui lòng đăng nhập trước');
            return res.redirect('/admin/login');
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    isUser: async(req, res, next) => {
        let user = req.isAuthenticated();
        try {
            if (user) {
                return next();
            }
            req.flash('error', 'Vui lòng đăng nhập trước');
            return res.redirect('/login');
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}