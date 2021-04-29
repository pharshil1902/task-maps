const mongoose = require('mongoose');

const connectdb = async () =>{
    try {
         const conn = await mongoose.connect(process.env.MONGO_URI,{
             useNewUrlParser:true,
             useCreateIndex:true,
             useFindAndModify:false,
             useUnifiedTopology:true
         });
         console.log(`mongodb connected: ${conn.connection.host}`);
    
    
        } catch (error){
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectdb;