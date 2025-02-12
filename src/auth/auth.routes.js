import { Router } from "express";
import { register } from "./auth.controller.js";
import { registerValidator } from "../middelwares/user-validators.js";
import { uploadProfilePicture } from "../middelwares/multer-upload.js";
const router = Router();

router.post("/register",uploadProfilePicture.single("profilePicture"),registerValidator,  register)


export default router;  