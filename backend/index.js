import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './helper/error.js';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoriesRouter.js';
import podcastRouter from './routes/podcastRouter.js';


dotenv.config();


const app = express();

app.use(express.json({ limit: '50mb' }));

// app.use(express.bodyParser({limit: '50mb'}));


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);

    next();
});

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));


app.use('/api/user', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/podcast', podcastRouter);

app.use('*', (req, res, next) => {

    const error = errorHandler(404, 'Not Found ' + req.originalUrl + ' on this server!')

    next(error);

});


app.use((err, req, res, next) => {
    // console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    const error = err.error || undefined;

    console.log(err)

    res.status(statusCode).json({
        success: false,
        message,
        error
    })

})


mongoose.connect(process.env.DATABASE)
    .then(() => console.log('DB connected!'))
    .catch(err => console.log('DB connect Failed!: ', err));



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})