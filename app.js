const express= require('express');
const app=express();
const pagesRouter=require('./routes/topics');
const Topic= require('./models/topic')
const ejs = require('ejs');
const mongoose=require('mongoose');
const connectToDB=require("./config/connectToDB");
const methodOverride= require('method-override')
const slugify= require('slugify');
const bodyParser = require('body-parser');
const path= require('path');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

connectToDB();

// mongoose.connect(CONNECTION_URI,{
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false}));
app.use(methodOverride('_method'));
const publicDirectoryPath = path.join(__dirname, "/public");
app.use(express.static(publicDirectoryPath));


app.get('/', async (req,res)=>{
   const topics=await Topic.find().sort({ datum: 'desc' })
   res.render('topics/index',{topics:topics});
  
})
app.get('/programing', async (req,res)=>{
  
    topics= await Topic.find({topic:'programing'}).sort({ datum: 'desc' })
    res.render('topics/index',{topics:topics});
   
  })

  app.get('/culture', async (req,res)=>{
  
    topics= await Topic.find({topic:'culture'}).sort({ datum: 'desc' })
    res.render('topics/index',{topics:topics});
   
  })

  app.get('/sport', async (req,res)=>{
  
    topics= await Topic.find({topic:'sport'}).sort({ datum: 'desc' })
    res.render('topics/index',{topics:topics});
   
  })

const PORT= process.env.PORT || 5000
app.use('/topics',pagesRouter);
app.listen(PORT, ()=>console.log("server running on ",PORT))