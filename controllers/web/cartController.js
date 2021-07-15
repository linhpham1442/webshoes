const productModel = require("../../models/productModel");
const cateModel = require('../../models/categoryModel');
const cartModel = require('../../models/cartModel');
// require('buffer');
let cartPage = {
    cart: "cart",
    checkout: "checkout"
}
let addToCart = async(req, res) => {
    let slug = req.params.slug;
    let product = await productModel.findOne({ slug: slug });
    if (req.session.cart == undefined) {
        req.session.cart = [];
        req.session.cart.push({
            name: product.name,
            slug: product.slug,
            price: product.price,
            qty: 1,
            total: product.price * 1
        })
    } else {
        let cart = req.session.cart;
        let newItem = true;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].slug == slug) {
                newItem = false;
                cart[i].qty++;
                cart[i].total = cart[i].price * cart[i].qty;
                break;
            }
        }
        if (newItem) {
            req.session.cart.push({
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                qty: 1,
                total: product.price * 1
            })
        }
    }
    req.flash('success', 'Thêm vào giỏ thành công');
    return res.redirect('/checkout');
}

let getCart = async(req, res) => {
    try {

        let loggedIn = (req.isAuthenticated()) ? true : false
        if (req.session.cart == undefined) {
            lengthCart = 0;
        } else {
            lengthCart = req.session.cart.length;
        };
        let cart = req.session.cart;
        // let name = "";
        // let email = "";
        // let phone = "";
        // let address = "";
        // let note = "";
        // let user = req.session.user;
        // if (loggedIn) {
        //     name = user.name;
        //     email = user.email;
        //     phone = user.phone;
        //     address = user.address;
        // }
        let total = 0;
        if (cart != undefined) {
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].total;
            }
        }
        let cates = await cateModel.find();
        return res.render('web/layout/master', {
            content: cartPage.checkout,
            data: {
                cart: cart,
                cates: cates,
                total: total,
                lengthCart: lengthCart,
            },
            // name: name,
            // email: email,
            // phone: phone,
            // address: address,
            // note: note,
            title: "Giỏ hàng"
        })
    } catch (error) {
        return res.status(500).json({
            type: "Error",
            msg: error
        })
    }
}

let getUpdateQty = async(req, res) => {
    try {
        if (req.session.cart == undefined) {
            lengthCart = 0;
        } else {
            lengthCart = req.session.cart.length;
        };
        let slug = req.params.slug;
        let cart = req.session.cart;
        // let total = 0;
        // if (cart != undefined) {
        //     for (let i = 0; i < cart.length; i++) {
        //         total += cart[i].total;
        //     }
        // }
        let cates = await cateModel.find();

        let action = req.query.action;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].slug == slug) {
                switch (action) {
                    case "add":
                        cart[i].qty++;
                        cart[i].total = cart[i].price * cart[i].qty;
                        break;
                    case "remove":
                        cart[i].qty--;
                        cart[i].total = cart[i].price * cart[i].qty;
                        if (cart[i].qty < 1) cart.splice(i, 1);
                        break;
                    case "clear":
                        cart.splice(i, 1);
                        if (cart.length == 0) delete req.session.cart;
                        break;
                    default:
                        console.log('update problem');
                        break;
                }
                break;
            }
        }

        req.flash('success', 'Cập nhật giỏ hàng thành công!');
        return res.redirect('/checkout');
    } catch (error) {
        return res.status(500).json({
            type: "Error",
            msg: error
        })
    }
}

let postCart = async(req, res) => {
    try {
        let param = req.body;
        let cart = req.session.cart;
        let total = 0;
        if (cart != undefined) {
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].total;
            }
        }
        let data = {
            infoProduct: req.session.cart,
            infoCustomer: param,
            total: total
        }
        await cartModel.create(data);
        delete req.session.cart;
        req.flash('success', 'Đặt hàng thành công!');
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({
            type: 'Error',
            msg: error
        })
    }
}

let clearCart = async(req, res) => {
    try {
        delete req.session.cart;
        req.flash('success', 'Xóa giỏ hàng thành công!');
        return res.redirect('/checkout');
    } catch (error) {
        return res.status(500).json({
            type: "Error",
            msg: error
        })
    }
}

module.exports = {
    addToCart: addToCart,
    getCart: getCart,
    postCart: postCart,
    getUpdateQty: getUpdateQty,
    clearCart: clearCart
}