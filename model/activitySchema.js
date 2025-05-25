const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title:{
type:String,
    required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

});
const activity = mongoose.model("activity",activitySchema);
module.exports=activity;