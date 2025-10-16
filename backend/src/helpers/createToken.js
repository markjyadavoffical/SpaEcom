import jwt from "jsonwebtoken";


const creatToken = (res, userId) => {
    const token = jwt.sign({userId},process.env.jwt_secret,{
        expiresIn:"30days"
    })

    //set jwt as an http-only cookes
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.jwt_secure!=="devlopment",
        sameSite:"static",
        maxAge:30 * 24 * 60 * 60 * 1000
    })
}

export {creatToken}