import mongoose, { Schema } from "mongoose";


const userScehma = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmain:{
        type:String,
        required:true,
        default:false
    }
})

export const User = mongoose.model("User", userScehma)