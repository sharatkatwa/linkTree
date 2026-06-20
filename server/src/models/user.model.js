import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 25,
      match: [
        /^((?!admin|root|login|register|signup|home|links).)*$/i,
        "Username contains restricted words.",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      min: 4,
      max: 200,
    },
    links: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Links",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  this.password = bcrypt.hashSync(this.password, 10);
  return;
});

export default userModel;
