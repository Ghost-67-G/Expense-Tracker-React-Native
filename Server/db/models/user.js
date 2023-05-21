const mongoose  = require("mongoose");

const User = mongoose.model('user', {
    user_name:{type:String,required:true},
    user_email:{type:String,required:true},
    user_password:{type:String,required:true},
    profile_picture:{type:String},
    history:{type:Array,required:true},
    total_balance:{type:Number,required:true},
    income:{type:Number,required:true},
    expense:{type:Number,required:true},
})

module.exports = User;
