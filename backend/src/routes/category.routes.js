import express, { Router } from "express";
import { authentitic, authroizeAdmin } from "../midlwers/authmidllwers.js";
import { createCategory, listCategory, readCategory, removedCategory, upadateCategory } from "../controllers/category.controllers";


const router  = Router()


router.route("/").post(authentitic,authroizeAdmin,createCategory)
router.route("/:category").put(authentitic, authroizeAdmin, upadateCategory)


router
   .route("/:categoryid")
   .delete(authentitic, authroizeAdmin, removedCategory)

router.route("/catogory").get(listCategory)
router.route("/:id").get(readCategory)


export default router;