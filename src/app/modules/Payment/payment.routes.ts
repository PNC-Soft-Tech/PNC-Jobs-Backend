import { auth } from "./../../middlewares/auth";
import express from "express";
import {
  getAllpayment,
  getAllCustomer,
  chargeCardOffSession,
  payWithoutWebhook,
  getAllPayments,
} from "./payment.controller";

const router = express.Router();

// router.post("/create-checkout-session",createCheckoutSession);

router.route("/charge-card-off-session").post(chargeCardOffSession);
router.route("/pay-without-webhook").post(payWithoutWebhook);
router.route("/pay");
router.get("/customers", getAllCustomer);
router.route("/").get(auth("admin"), getAllPayments); //.post(paymentProcess)
// router.route("/").get(getAllpayment); //.post(paymentProcess)

export const PaymentsRouter = router;
