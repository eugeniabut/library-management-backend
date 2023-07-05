import jwt from "jsonwebtoken"
export const authorization=async(req,res,next)=>{
try {
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
const token=req.headers.authorization?.split(" ")[1]
if(!token){
    const err = new Error("Sorry Your ane not Authorized")
    err.statusCode=(401)
    throw err
}
const payload=jwt.verify(token,JWT_SECRET_KEY)

        req.email = payload.email
        req.userId = payload.userId
        req.userType = payload.userType
    }
    catch (err) {
        next(err)
    }
    next()
}


export const adminAuth=async(req,res,next)=>{
try {
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
const token=req.headers.authorization?.split(" ")[1]
if(!token){
    const err = new Error("pleas Login...!")
    err.statusCode=(401)
    throw err
}
const payload=jwt.verify(token,JWT_SECRET_KEY)
req.email = payload.email
req.userId = payload.userId
req.userType=payload.userType
if(req.userType!="admin"){
    const err = new Error("Sorry you are not Admin...!")
    err.statusCode=(400)
    throw err
}
}
catch(err){
    next(err)
}
next()
}
