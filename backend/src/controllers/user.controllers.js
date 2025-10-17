
import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { creatToken } from "../helpers/createToken";
import { User } from "../models/users.model.js";
import bcryptjs from "bcryptjs"

const createUser = asyncHandler(async(req, res) =>{
        const {username, email , password } = req.body
        if(!username || !email || !password){
            throw new ApiError(400, "all fields required")
        }
        const userExists =await User.findOne({email})
        if(userExists){
            throw new ApiError(400, "user alrady exists")
        }
        const slat = await  bcryptjs.genSalt(10)
        const haspassword = await  bcryptjs.hash(password, slat)

        const newUser = new User({username, email, password:haspassword})
        try {
            await newUser.save()
            creatToken(res, newUser._id)
            res.status(200).json(
                new ApiResponse(201, newUser, "user created sussfully")
            )
        } catch (error) {
            throw new ApiError(400, "user not create")
        }

})


const LoginUser  = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400, "please risther user ")
    }
    const passwordvalid = bcryptjs.compare(password, user.password)
    if(!passwordvalid){
        throw new ApiError(400, "please enter true password")
    }
    creatToken(req, user._id)
    res.status(200).json(
        new ApiResponse(201, "", "login user was sussfully")
    )
})

const LogoutUser = asyncHandler(async(req,res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status(200).json(
        new ApiResponse(201,{}, "user LogoutSussfully")
    )
})

const getallUser = asyncHandler(async(req,res) => {
    const users = await  User.find({})
    res.status(200).json(
        new ApiResponse(201, users, "getallUser find sussfully")
    )
})
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const dleteUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    
    if(user){
        if(user.isAdmain){
            throw new ApiError(400, "not delte account for user Admin")
        }
     await User.deleteOne({_id:user._id})
     res.status(200).json(
         new ApiResponse(201, {}, "delte account sussfully")
     )
    }else{
        throw new ApiError(400, "user not found")
    }

})

const getUserByid  = asyncHandler(async(req, res) => {
    const user =await User.findById(req.params.id).select("-password")
    if(!user){
        throw new ApiError(400, "user not found")
    }
    res.status(200).json(
        new ApiResponse(201, user, "user fectch sussfully")
    )
})

const UserupadtebyId = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        throw new ApiError(400, "user not found")
    }
    user.email  = req.body.email || user.email
    user.username = req.body.username || user.username
    user.isAdmain  = Boolean(req.body.isAdmain)

    const updateUser = await user.save()

    res.status(200).json(
        new ApiResponse(201, updateUser, "userupadate sussfully")
    )
})

export {createUser, LoginUser, LogoutUser, getallUser, getCurrentUserProfile, updateCurrentUserProfile, dleteUserById,getUserByid, UserupadtebyId}