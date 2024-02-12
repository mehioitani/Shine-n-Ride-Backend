import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  // deleteAllOrders,
} from "../controllers/orderController.js";


import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/orders")
  .get(getAllOrders)
  .post(createOrder)
  // .delete(Protect, deleteAllOrders);

router
  .route("/orders/:id")
  .put(Protect, updateOrder)
  .delete(Protect, deleteOrder)
  .get(getOrderById);

export default router;
