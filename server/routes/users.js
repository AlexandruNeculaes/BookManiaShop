import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

//route for signin
router.post("/signin", signin);

//route for signup
router.post("/signup", signup);

export default router;
