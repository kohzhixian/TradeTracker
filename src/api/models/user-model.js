const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String, 
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isDeleted: {
        type: String,
        required: true
    }
    //Enable schmea validation
}, {validateBeforeSave: true});


//allows mongoose to add unique validation
userSchema.plugin(uniqueValidator);

//avoid pluralization complexity
module.exports = mongoose.model('User', userSchema, 'User');