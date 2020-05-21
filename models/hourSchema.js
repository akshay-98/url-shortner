const mongoose=require('mongoose');
const shortId=require('shortid');

const hourSchema=mongoose.Schema({
    year:{
        type:Number,
        default:new Date().getFullYear()
    },
    month:{
        type:String,
        default:new Date().getMonth()
    },
    day:{
        type:Number,
        default:new Date().getDay()
    },
    hour:{
        type:Number,
        default:new Date().getHours()
    },
    visits:{
        type:Number,
        default:1
    }
});

module.exports=mongoose.model('hourSchema',hourSchema);