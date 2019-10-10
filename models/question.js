const mongoose=require('mongoose');

/*mongoose.connect('mongodb://localhost:27017/Expense',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});*/

var questionSchema = new mongoose.Schema({
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    answer:String

});

var question=mongoose.model("question",questionSchema);

module.exports=question;



