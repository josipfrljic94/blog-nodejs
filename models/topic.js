const mongoose= require('mongoose');
const marked= require('marked');
const slugify= require('slugify');



const schema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        require:true
    },
   body:{
       type:String,
       required:true
   },
   desc:{
       type:String,
       required:true
   },
   slug:{
    type:String,
    required:true,
    unique:true,
},
    myImg:{
      type:String,
      required:true,
       
    },
   datum:{
       type:Date,
       default:Date.now
   },
   topic:{
       type:String,
       required:true,
   }
  
})
schema.pre('validate',function(next){
    if (this.title) {
        this.slug = slugify(this.title,{ lower: true, strict: true })
    }
   
    
    next()
})

module.exports=mongoose.model('Topic',schema)