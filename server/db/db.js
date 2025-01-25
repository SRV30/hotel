import mongoose from "mongoose";

const connectDB=async(URL)=>{
    try {
         await mongoose.connect(URL);
         console.log("Database connected successfully");       
    } catch (error) {
        console.log(error);
         console.log("Error while Connecting with database");   
    }
}
export default connectDB;