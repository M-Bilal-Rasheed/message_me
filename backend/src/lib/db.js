import mongoose from "mongoose"
import Message from "../models/message.model.js"

export async function connectDB () {
    try{
        const mongoUri = process.env.MONGO_URI
        if(!mongoUri){
            throw new Error("mongo uri is required");
        }
        await mongoose.connect(mongoUri)
        await Message.syncIndexes()
        console.log("MongoDB Connected")
    }catch(error){
      console.error("MongoDB connection error :" , error.message)  
    }
}