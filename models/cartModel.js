const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
    infoProduct:{
        type : Array
    },
    infoCustomer:{
        name:{
            type : String
        },
        phone:{
            type : Number
        }, 
        email:{
            type : String,
        },
        address :{
            type : String
        },
        note :{
            type: String
        }
    },
    total:{
        type:Number
    },
    createdAt :{
        type : Date,
        default : Date.now()
    }
})
let cardModel = mongoose.model('cards',cardSchema);
module.exports = cardModel