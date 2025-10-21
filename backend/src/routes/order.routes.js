import express, { Router } from "express";
import { authentitic, authroizeAdmin } from "../midlwers/authmidllwers.js";
import { calcualteTotalSalesByDate, calculateTotalSales, countTotalOrders, createOrder, findOrderById, getAllOrders, getUserOrders, markOrderAsDelivered, markOrderAsPaid } from "../controllers/order.cotnrollers.js";



const router = Router()


router
  .route("/")
  .post(authentitic, createOrder)
  .get(authentitic, authroizeAdmin, getAllOrders)



router.route("/mine").get(authentitic,getUserOrders)
router.route("/total-order").get(countTotalOrders)
router.route("/total-sell").get(calculateTotalSales)
router.route("/total-sell-by-date").get(calcualteTotalSalesByDate)
router.route("/:id").get(authentitic, findOrderById)
router.route("/:id/pay").put(authentitic, markOrderAsPaid)

router
  .route("/:id/deliver")
  .put(authentitic, authroizeAdmin,markOrderAsDelivered)

export default router;