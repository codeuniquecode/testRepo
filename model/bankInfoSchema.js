// bankName, branchInfo,accountName,accountNumber
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bankName:{
        type:String,
        required:true
    },
    branchInfo:{
        type:String,
        required:true
    }
    ,accountName:{
        type:String,
        required:true
    },
    accountNumber:{
        type:String,
        required:true
    },
    qr:{
        type:String,
        required:true,
    }
});
const bank = mongoose.model("bank",bankSchema);
module.exports= bank;