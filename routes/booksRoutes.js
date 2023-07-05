import express from "express"
import { addBook, getBooks, rentBook, returnBook, review } from "../controllers/booksController.js"
import { adminAuth, authorization } from "../middleware/authorization.js"
const router= express.Router()
router.post("/add-book",adminAuth,addBook)
router.get("/all-books",authorization,getBooks)
router.put("/all-books/rent",authorization,rentBook)
router.put("/all-books/return",authorization,returnBook)
router.post("/review",authorization,review)


export default router