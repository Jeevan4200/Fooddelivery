import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2').then(()=>console.log("DB connected"));
}