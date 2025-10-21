import express, { Router } from "express";
import router from "./users.routes";
import formidable from "express-formidable";
import { authentitic, authroizeAdmin } from "../midlwers/authmidllwers.js";
import { createProdcut, fetchAllProducts, fetchNewProducts, fetchProductById, fetchTopProducts, filterProducts, productReview, removeProduct, upadateProduct , } from "../controllers/product.controllers.js";
import { checkid } from "../midlwers/checkid.js";


const router  = Router()


router
   .route("/")
   .get("fecthProdcut")
   .post(authentitic,authroizeAdmin, formidable(),createProdcut );

router.route("/allprodcut").get(fetchAllProducts)
router.route("/:id/reviews").post(authentitic,checkid,productReview )


router.route("top").get(fetchTopProducts)
router.route("new").get(fetchNewProducts)



router
   .route("/:id")
   .get(fetchProductById)
   .put(authentitic,authroizeAdmin,formidable(),upadateProduct)
   .delete(authentitic, authroizeAdmin, removeProduct)


router.route("/fillter-product").post(filterProducts)


export default router;