import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) =>{
    console.log("req.cookies:", req.cookies);

    const token = req.cookies.token;

    if (!token) {
        const error = errorHandler(403, 'No Token:Please Login to get Token!')
        return next(error);
    };

    // console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            const error = (403, 'Invlid Token: Please Login Again!', err.message);
            return next(error);
        }

        // console.log(data);
        req.user = {
            id: data.id,
            email: data.email,
            username: data.username
        }

        next()
    })

    
}