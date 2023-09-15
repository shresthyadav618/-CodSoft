
import mongoose from "mongoose";
export async function connect(){
   //  console.log('the mongo db url is : ',process.env.MONGO_URL);
     try{
        await mongoose.connect(process.env.MONGO_URL);
      //   console.log('connected to mongo database');
     }catch(error){
        console.log('there was some error while connecting')
     }
}