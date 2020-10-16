const mongoose= require("mongoose");
const config= require("config");

const connectToDB=async()=>{
    try{
        await mongoose.connect(
                    config.get("mongoURL"),
                    {
                        useCreateIndex:true,
                        useFindAndModify:true,
                        useUnifiedTopology:true,
                        useNewUrlParser:true
                        
                    }
                  
        )
        console.log("MongoDB is connected")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports= connectToDB;