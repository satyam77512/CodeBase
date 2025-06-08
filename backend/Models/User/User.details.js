const mongoose = require('mongoose')

const UserDetails= mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    MiddleName:{
        type:String,
    },
    LastName:{
        type:String,
        required:true
    },
    RollNumber:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Year:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    ProfilePic:{
        type:String,
        required:true
    },
    ProfilePicPublicId:{
        type : String,
        required : true
    },
    Resume:{
        type:String,
        required:true
    },
    Skills:[
        {type:String}
    ],
    Status:{
        type:Boolean,
        default:true,
        required:true
    }
})

module.exports = mongoose.model("User Details", UserDetails);