import { Request, Response,NextFunction } from "express";

export const signup = async (req: Request, res: Response, next:NextFunction)=>{
    const {body} =req
    

    // Add signup logics
    res.status(200).json({
        message: 'Signup Successful'
    })
}