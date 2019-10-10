const mongoose=require('mongoose');

/*mongoose.connect('mongodb://localhost:27017/Expense',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});*/

var nameSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:String,
    city:String,
    password:String

});

var user=mongoose.model("user",nameSchema);

module.exports=user;



