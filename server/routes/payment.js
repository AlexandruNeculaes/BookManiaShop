import express from "express";
import { paymentController } from "../controllers/payment.js";
const router = express.Router();

//router for payment
router.post("/", paymentController);

export default router;
