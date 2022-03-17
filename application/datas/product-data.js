var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var products=new Schema({
    item:String,
    name:String
})
module.exports=mongoose.model('Product',products);