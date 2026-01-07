import jwt from 'jsonwebtoken';


export const signJwt = (userId : string)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET!, {
        expiresIn : "7d"
    })
}

export const verifyJwt = (token: string)=>{
    return jwt.verify(token, process.env.JWT_SECRET!) as {userId : string}
}