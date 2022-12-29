const mongoose=require('mongoose');
const ProductScheme=new mongoose.Schema({
 name:String,
 price:String,
 categories:String,
 userID:String,
 company:String
})
module.exports=mongoose.model('Product',ProductScheme);