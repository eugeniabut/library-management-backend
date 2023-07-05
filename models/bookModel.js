import mongoose from "mongoose";
const bookSchema =new mongoose.Schema({
    bookName:{type:String, required:true},
   bookAuthor:{type:String, required:true},
    bookPages:{type:String, required:true},
   bookPrice:{type:String, required:true},
   available:{
    type:Boolean,default:true
   },
   rentedBy:{
    type:String,default:"non"
   },
   reviews:
   {
       type: [{
           type: mongoose.Schema.Types.ObjectId,
           ref: "review"
       }]
   },

})
export default mongoose.model("book", bookSchema)