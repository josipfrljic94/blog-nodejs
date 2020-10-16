const express= require('express');
const router=express.Router();
const Topic= require('./../models/topic');
const multer= require('multer');
const path= require('path');


const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));

  }
})
 
const upload = multer({ 
  storage: storage,
    limits: {fileSize:500000},
    fileFilter:(req,file,cb)=>{
            checkFileType(file,cb);
    }
})

const checkFileType=(file,cb)=>{
  const filetypes=/jpeg|jpg|png|gif/;
  const checExt=filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
  const mimeType= filetypes.test(file.mimetype)

  if(mimeType && checExt){
      return(cb(null,true));
  }
  else{
      cb('error:img only')
  }
}




router.get( '/new',(req,res)=>{
    res.render('topics/new', {topic: new Topic()})
})
router.get('/:slug', async(req,res)=>{
    // console.log(slug)
    const topic= await Topic.findOne({ slug:req.params.slug})
    if(topic==null) res.redirect('/');
    res.render('topics/show',{topic:topic})
  
    
})
router.get('/edit/:id', async (req, res) => {
    const topic = await Topic.findById(req.params.id)
    res.render('topics/edit', { topic: topic })
  })

router.post('/', upload.single('myImg'),async function(req,res){
 console.log(req.file,req.body)


    let topic= new Topic({
       title:req.body.title,
       author:req.body.author,
       body: req.body.body,
       desc: req.body.desc,
       topic:req.body.topic,
      myImg: req.file.filename,
    })
    try{
        topic= await topic.save();
        res.redirect(`/topics/${topic.slug}`)
    }catch(e){
        console.log('ovjedesam',e)
        res.render('/topics/new',{topic:topic});
        
    }
 
})

router.put('/:id',upload.single('myImg'), async(req,res,next)=>{
    let topic = await Topic.findById(req.params.id);
  topic.title = req.body.title
 topic.desc = req.body.desc
   topic.body = req.body.body;
   topic.author=req.body.author;
   topic.topic=req.body.topic;
   topic.myImg= req.file.filename;
    try {
        topic = await topic.save()
        res.redirect(`/topics/${topic.slug}`)
      } catch (e) {
        res.render(`topics/edit`, { topic: topic})
      }
      next()
})


router.delete('/:id', async(req,res)=>{

 await Topic.findByIdAndDelete(req.params.id)
    
    res.redirect('/')
   
})

module.exports=router;