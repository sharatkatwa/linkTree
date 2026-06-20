import mongoose from "mongoose"
import env from "../../config/config.js"

export default DBconnect = async()=>{
    await mongoose.connect(env.MONGO_URI)
    console.log('mongodb connected');
}