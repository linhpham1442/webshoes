const mongoose = require('mongoose');
const {database} = require('./config');
let connectDb=function(){
    mongoose.connect(database.uri,{ useNewUrlParser: true,useUnifiedTopology: true  } )
    .then(response =>{
        console.log("Mongodb connected success");
    }).catch(err=>{
        console.log("Database connect failed");
    })
}

module.exports = connectDb;