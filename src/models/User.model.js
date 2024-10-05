import mongoose, { Schema } from "mongoose";
import Jwt from "JsonWebTokenError";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
  {
    userName: {
      type: string,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullName: {
      type: string,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: string,
      required: true,
    },
    coverImage: {
      type: string,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: string,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.bcrypt = bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken=function(){
    return Jwt.sin({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName,

    },
process.env.ACCESS_TOKEN_SECRET,
{
   expireIn: process.env.ACCESS_TOKEN_EXPIRY

})
}
UserSchema.methods.generateRefreshToken=function(){
    UserSchema.methods.generateAccessToken=function(){
        return Jwt.sin({
            _id:this._id,
            
    
        },
    process.env.REFRESH_TOKEN_SECRET,
    {
       expireIn: process.env.REFRESH_TOKEN_EXPIRY
    
    })
}}

export const User = mongoose.model("USER", UserSchema)
