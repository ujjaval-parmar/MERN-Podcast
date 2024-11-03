import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


import UserModel from "../models/userModel.js"
import { errorHandler } from "../helper/error.js";


export const getUser = async(req, res, next)=>{
    try{

        const {id} = req.user;

        const responce = await UserModel.findById(id);

        // console.log(responce);

        const userData =  {...responce._doc, password: undefined};
        

        res.status(200).json({
            success: true,
            message: 'Get User Data Success!',
            data: userData

        })
    }catch(err){
        const error = errorHandler(500, 'Get User Data Failed!', err.message);
        next(error);
    }
}

export const signup = async (req, res, next) => {

    try {

        const { username, email, password, profilePic } = req.body;

        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            const error = errorHandler(400, 'Please Add Required Fields to SignUp!');
            return next(error);
        }

        if (username.length < 5) {
            const error = errorHandler(400, 'Username must have least 5 characters to SignUp!');
            return next(error);
        }

        if (password.length < 5) {
            const error = errorHandler(400, 'Password must have least 5 characters to SignUp!');
            return next(error);
        }

        const userExist = await UserModel.findOne({ $or: [{ email }, { username }] })


        if (userExist) {
            const error = errorHandler(400, 'Username or Email already Exists!');
            return next(error);
        }

        const hasedPassword = await bcrypt.hash(password, 12);


        const responce = await UserModel.create({
            username, email, password: hasedPassword, profilePic: profilePic ? profilePic : undefined
        })

        res.status(201).json({
            success: true,
            message: 'User Sign Up Success!',
            data: responce

        })
    } catch (err) {
        const error = errorHandler(500, 'User Sign Up Failed!', err.message);
        next(error);
    }


}


export const signin = async(req, res, next) => {
    try {


        const {  username, password } = req.body;


        const userExists = await UserModel.findOne( { username })

       

        if(!userExists){
            const error = errorHandler(400, 'Username or Email is not Valid!');
            return next(error);
        }

        const hasedPassword =  await bcrypt.compare(password, userExists.password);

        
        if(!hasedPassword){
            const error = errorHandler(404, 'Password is Invalid!');
            return next(error);
        }

        // console.log(userExists);
        

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: userExists._id,
            username: userExists.username,
            email: userExists.email
        }, process.env.JWT_SECRET, { expiresIn: age });
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: age,
            SameSite: 'lax',
            // domain: "localhost",
            // secure: true
        });
        
        const userData =  {...userExists._doc, password: undefined};

        res.status(200).json({
            success: true,
            message: 'User Sign In Success!',
            data: userData

        })
    } catch (err) {
        const error = errorHandler(500, 'User Sign In Failed!', err.message);
        next(error);
    }
}


export const logout = async(req, res, next)=>{
    try{

        res.clearCookie('token', {
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: 'User has been signed  out successfully!'
        })


    }catch(err){
        const error = errorHandler(500, 'User Sign Out Failed!', err.message);
        next(error);
    }
}

export const checkToken = (req, res, next) =>{
    // console.log(req.cookies.token);

    const token = req.cookies.token;

    if (!token) {
        const error = errorHandler(403, 'Please Login!')
        return next(error);
    };

    // console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            const error = (403, 'Please Login Again!', err.message);
            return next(error);
        }

        // console.log(data);
        req.user = {
            id: data.id,
            email: data.email,
            username: data.username
        }

        res.status(200).json({
            success: true,
            message: 'User Token Verify Success!',
            data: req.user

        })

        
    })

    
}