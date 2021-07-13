const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    cateId:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    sale:{
        type:Number,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        data:{
            type:Buffer,
        },
        contentType:{
            type:String
        }
    },isDeleted:{
        type:Boolean,
        required:true
    },
    popular:{
        type:Boolean,
        default:false
    },
    hot:{
        type :Boolean,
        default: false
    }
    ,creationDate:{
        type:Date,
        default: new Date()
    }
})
let productModel = mongoose.model('product',productSchema);
module.exports = productModel;