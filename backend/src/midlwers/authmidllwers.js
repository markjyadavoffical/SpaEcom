import { User } from "../models/users.model";
import { asyncHandler } from "../helpers/asyncHandler";
import { ApiError } from "../helpers/ApiError";
import { ApiResponse } from "../helpers/ApiResponse";
import jwt from  "jsonwebtoken";

const authentitic   = asyncHandler(async(req, res, next) => {
    let token;
    token = req.cookies.jwt

    if(token){
        try {
            const decodeToken = jwt.verify(token, process.env.jwt_secret)
            req.user = await User.findById(decodeToken_userId).select("-password")
            next()
        } catch (error) {
            throw new ApiError(400, "non authriztion , no token ")
        }
    }else{
        throw new ApiError(400, "no token , no authrzition")
    }


})

const authroizeAdmin = asyncHandler(async(req, res, next) => {
   if(req.user && req.user.isAdmin){
    next()
   }else{
    throw new ApiError(400, "no user as an admin ")
   }
})


export {authentitic, authroizeAdmin}