import express from "express"
import {createUser,getAllUsers, deleteUser } from "../controllers/userController.js"
import {loginHandler,passwordChangeHandler}from "../controllers/authController.js"
import { authorization, adminAuth } from "../middleware/authorization.js"
import {validateInputs} from "../middleware/validator.js"
import {userRules}from "../lib/validation/rules.js"
const router= express.Router()

router.post("/create-user",validateInputs(userRules),createUser)
router.post("/login",loginHandler)
router.delete("/:id", authorization,deleteUser);
router.get("/list",adminAuth, getAllUsers)
router.put("/change-password/:id",authorization,passwordChangeHandler)

export default router