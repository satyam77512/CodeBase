const mongoose = require('mongoose')

const UserCredentials = mongoose.Schema({
    Loginid: {
        type:String,
        reqired:true
    },
    Password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("User Credentials", UserCredentials);