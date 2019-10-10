const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const user=require('./models/user');
const question=require('./models/question');
const ejs=require('ejs');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const bodyParser=require('body-parser');
const port=process.env.port || 3200;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));




mongoose.connect('mongodb://localhost:27017/Quiz',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});

app.get('/',(req,res)=>{
    res.render('register');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/admin',(req,res)=>{
    res.render('admin');
});
app.get('/addagain',(req,res)=>{
    res.render('addquestion');
})
app.post('/checkadmin',async(req,res)=>{
    var info=await req.body;
    if(info.email=="nishantkumar91099@gmail.com" && info.password=="Ok123456@"){
        console.log('you are admin bro');
        res.render('addquestion');
    }
    else{
        console.log("maa mt chudao");
    }
});

app.post('/addquestion',async(req,res)=>{
       var questiondata=await req.body;
       var myquestion=new question(questiondata);
       myquestion.save().then(item=>{
           console.log('saved to database');
           res.render('addquestion');
       }).catch(err=>{
           console.log('unable to save to database');
       });

});


app.get('/getallquestions',async(req,res)=>{
    var yourallquestions=await question.find({});
    //console.log(yourallquestions);
    if(yourallquestions){
        console.log(yourallquestions[0].question);
        res.render('getallquestion',{yourallquestions});
    }
    else{
        console.log('no questions to show');
    }
})




app.post("/addname", async(req, res) => {
    var myData = req.body;
    var checkdata=await user.findOne({email:req.body.email});
    if(!checkdata){
    myData.password=bcrypt.hashSync(myData.password, 10);
    mydata=new user(myData);
    mydata.save()
        .then(item => {
           // res.send("item saved to database");
            res.render('login');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    }
    else{
        res.send("already used email");
    }
});







app.post('/checkname',async(req,res)=>{
    //var mylogindata=req.body;
    var userhere=await user.findOne({email:req.body.email});
    //console.log(userhere.password);
     if(userhere){
        // console.log('userfound');
       var valid=await bcrypt.compare(req.body.password,userhere.password);
       //console.log(valid);
       if(!valid){
           console.log('incorrect');
       }
       else{
          //id=userhere._id;
          //console.log(id);
           //res.render('quiz',{});
           var name=userhere.name;
           var yourquestions=await question.find({});
           //console.log(yourquestions[0]._id);
           if(yourquestions){
               res.render('quiz',{yourquestions,name});
            
           }
           
       }  
         }
     else{
         console.log('user not exist go to register');
     }
    
});


app.post('/checkanswer',async(req,res)=>{
    var answers=await req.body;
    var count=0;
    if(answers){
      // console.log(answers.answer[0]);
       //console.log(answers.answer[1]);
      // console.log(answers._id[1]);
       var newarray=(answers.answer).reverse();
      // console.log(newarray);
       var answers1=await question.find({});
       //console.log(answers1[0]);
       if(answers1){
       for(var i=9;i>=0;i--){
               if(answers1[i].answer==newarray[i]){
                   //console.log('match');
                      count++;
           }
       }
    }
       //console.log(count);
       res.render('showresult',{count});
    }
});


app.listen(port,(res,err)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log("server is running");
    }
});