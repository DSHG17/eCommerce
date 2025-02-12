import { Router } from "express";

import { updateUser } from "./user.controller.js";
import { updateUserValidator } from "../middelwares/user-validators.js";

const router = Router();


router.put("/updateUser/:uid",updateUserValidator,updateUser)

export default router
