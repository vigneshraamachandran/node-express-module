var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=mongoose.Schema.Types.ObjectId;
var copied=new Schema({
      title:({type:String}),
      copy:({type:ObjectId,ref:'Product'})
});
module.exports=mongoose.model('Copies',copied);