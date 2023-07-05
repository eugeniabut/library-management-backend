import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const createUser =async(req,res,next) => {
    try{
        const { firstName, lastName,email,password}=req.body
        const checkUser= await User.findOne({email})
    if (checkUser){
        const err = new Error("user already existing..! please try to login")
        err.statusCode=400
        throw err
    }
        const saltRounds = 11
        const salt = await bcrypt.genSalt(saltRounds)
        
        const hashedPassword = await bcrypt.hash(password, salt) 

       
        const user = new User({
            firstName,
            lastName,
            email,
          
             password:hashedPassword,
            
        })

        const newUser = await user.save()


res.status(200).send("user successfully added ..!")
}
catch(err){
next(err)
}

}
// update user , delete  user, get allUsers

export const getAllUsers = async (req,res,next)=>{
    try {
        const userList = await User.find(req.body)
       res.status(200).json(userList)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User deleted!" });
    } catch (error) {
      console.log(error.message);
    }
  };