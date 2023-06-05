const express = require("express");
const cors = require("cors");
const app = express();

//controller function
const { payment, verify, getkey } = require("../controller/paymentController");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//instance of a express Router -> router
const router = express.Router();

router.get("/getkey", getkey);

//Payment
router.post("/payment", payment);

// Verify
router.post("/verify", verify);

module.exports = router;
