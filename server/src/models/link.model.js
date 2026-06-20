import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  isDeleted:{
    type:Boolean,
    default:false
  },

});


const linkModel = mongoose.model("Link",linkSchema)

export default linkModel