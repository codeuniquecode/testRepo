// name, email, phone , subject,message
const mongoose = require('mongoose');
const moment = require('moment');
const date = new Date(Date.now());
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        require:true
    },
    message:{
        type:String,
        required:false,
        default:null
    },
    isRead:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        default:moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
});
const contact = mongoose.model("contact",contactSchema);
module.exports= contact;