import express, { Router } from "express";
import { createUser, dleteUserById, getallUser, getCurrentUserProfile, getUserByid, LoginUser, LogoutUser, updateCurrentUserProfile, UserupadtebyId } from "../controllers/user.controllers.js";
import { authentitic, authroizeAdmin } from "../midlwers/authmidllwers.js";


const router  = Router()


router
   .route("/")
   .post(createUser)
   .get(authentitic,authroizeAdmin,getallUser);


router.route("/auth").post(LoginUser)
router.route("/logout").post(LogoutUser)

router
   .route("/profile")
   .get(authentitic, getCurrentUserProfile)
   .put(authentitic, updateCurrentUserProfile)



//Adimn Routes👇
router.route("/:id")
.delete(authentitic, authroizeAdmin,dleteUserById)
.get(authentitic, authroizeAdmin, getUserByid)
.put(authentitic, authroizeAdmin,UserupadtebyId)
    


export default router;