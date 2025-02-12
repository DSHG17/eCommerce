import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { defaultUser } from "./src/user/user.controller.js"


config()
initServer()
defaultUser()