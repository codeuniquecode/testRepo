const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    }
});
const vacancy = mongoose.model("vacancy",vacancySchema);
module.exports= vacancy;