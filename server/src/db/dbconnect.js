import mongoose from "mongoose"
import env from "../../config/config.js"

const DBconnect = async()=>{
    await mongoose.connect(env.MONGO_URI)
    console.log('mongodb connected');
}

export default DBconnect