import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique: true
    },
    links:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Links"    

    }
},{
    timestamps:true
})

const userModel = mongoose.model('User',userSchema)


userSchema.pre('save',function(){
    if(!this.isModified('password')) return
    
    this.password = bcrypt.hashSync(this.password, 10)
    return
})

export default userModel