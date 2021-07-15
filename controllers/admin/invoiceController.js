const cartModel = require('../../models/cartModel');
const slug = require('slug');

const invoicePage = {
        index: "invoice/index",
        detail: "invoice/detail"
    }
    // index product
let index = async(req, res) => {
    try {
        let cart = await cartModel.find();
        console.log(cart);
        return res.render('admin/layout/master', {
            content: invoicePage.index,
            data: {
                cart: cart
            },
            title: "Đơn hàng"
        });
    } catch (err) {
        return res.status(500).json({
            type: 'error',
            message: err
        });
    }
};

let detail = async(req, res) => {
    try {
        let id = req.params.id
        let cart = await cartModel.findOne({ _id: id });
        return res.render('admin/layout/master', {
            content: invoicePage.detail,
            data: {
                cart: cart
            },
            title: "Chi tiết đơn hàng"
        });
    } catch (err) {
        return res.status(500).json({
            type: 'error',
            message: err
        });
    }
};
module.exports = {
    index: index,
    detail: detail
}