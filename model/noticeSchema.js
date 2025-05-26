const mongoose = require('mongoose');
const moment = require('moment');
const date = new Date(Date.now());
const noticeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
       date:{
           type:String,
           default:moment(date).format('MMMM Do YYYY, h:mm:ss a')
       },
    isActive:{
        type:Boolean,
        default:false
    }
});
const notice = new mongoose.model("notice",noticeSchema);
module.exports = notice;