import Book from "../models/bookModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";
import {emailSender}from "../utils/emailSender.js"

export const addBook = async (req, res) => {
  try {
    const allBooks = await Book.create(req.body);
    res.status(200).send("New Book has ben added ...!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};


export const rentBook = async (req, res, next) => {
  try {

    const { bookId,userId,email } = req.body;

   

    await Book.findByIdAndUpdate(
      bookId,
      { available: false, rentedBy: userId },
      { new: true }
    );

    const userData = await User.findOne({ _id: userId });
    const bookData = await Book.findOne({ _id: bookId });
    console.log(userData, bookData);

    // Get date for book return:
    const today = new Date();
    today.setDate(today.getDate() + 30);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    // Email content:

    const subject = "Confirmation Email";
    const plainText = "Your book rental has been confirmed.";
    const htmlText = `<h2>Dear ${userData.firstName},</h2> your book rental Title: "${bookData.bookName}" Author: ${bookData.bookAuthor} has been confirmed. The latest return date is <b>${formattedDate}</b>`;
      if(bookData.available){
        const err = new Error(" Sorry..Book already rented.")
        err.statusCode = 401;
        throw err;
      }
    const emailSent = await emailSender(email, subject, plainText, htmlText);

    if (emailSent) {
      res
        .status(200)
        .json({ message: "Book rented and confirmation email sent." });
    } else {
      const err = new Error("Error renting book.");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};
//----------------------

export const returnBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    const userData = await User.findOne({ _id: userId });
    const bookData = await Book.findOne({ _id: bookId });
    console.log(userData, bookData);

    if (!bookData.available) {
      await Book.findByIdAndUpdate(
        { _id: bookId },
        { available: true, rentedBy: "non" },
        { new: true }
      );
      res.status(201).send("Book returned...! Thank you for visiting us.");
    } else {
      const err = new Error("Please check user data.");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    next(err);
    const { userId, bookId } = req.body;
    const userData = await User.findOne({ _id: userId });
    const bookData = await Book.findOne({ _id: bookId });
    console.log(userData, bookData);
    if (bookData.available) {
      await Book.findByIdAndUpdate(
        { _id: bookId },
        { available: false, rentedBy: userId },
        { new: true }
      );
      res.status(201).send("Happy booking time..!");
    } else {
      const err = new Error("Sorry This book is not available");
      err.statusCode = 401;
      throw err;
    }
  }
  // catch (err) {
  //     next(err)

  // }
};
// export const returnBook = async (req, res, next) => {

//     try {

//         const { userId, bookId } = req.body
//         const userData = await User.findOne({ _id: userId })
//         const bookData = await Book.findOne({ _id: bookId })
//         console.log(userData, bookData);
//         if (!bookData.available) {
//             await Book.findByIdAndUpdate({ _id: bookId }, { available: true, rentedBy: "non" }, { new: true })
//             res.status(201).send("Book returned...!Thank you for visit us")
//         }
//         else {
//             const err = new Error("please check user data..!")
//             err.statusCode = 401
//             throw err
//         }
//     }
//     catch (err) {

//         next()

//     }
// }


export const review = async (req, res, next) => {
  try {
    const { userId, review, bookId, starsEvaluation } = req.body;
    const userName = await User.findById(userId);
    const text = `${userName.firstName}: ${review}`;
    const newReview = new Review({
      userId,
      bookId,
      text,
      starsEvaluation,
    });
    await newReview.save();
    //    const   allReviews=await Book.find().populate("review")
    //console.log(allReviews);
    res.status(200).send("Thank you for your Feedbacks...!");
  } catch (err) {
    res.status(400).send("Sorry..stars Evaluation from 1 to 5");
  }
};

