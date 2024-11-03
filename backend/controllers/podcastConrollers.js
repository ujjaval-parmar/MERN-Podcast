import CategoryModel from "../models/categoryModel.js";
import PodcastModel from "../models/podcastModel.js";
import UserModel from "../models/userModel.js";
import { errorHandler } from "../helper/error.js";


export const addPodcast = async (req, res, next) => {

    try {

        const { title, description, category } = req.body;

        const frontImage = req?.files['frontImage'][0]?.path;
        const audioFile = req?.files['audioFile'][0]?.path;

        if (!title?.trim() || !description?.trim() || !category?.trim() || !frontImage || !audioFile) {
            const error = errorHandler(400, 'All Field Required for Add Podcast!', err.message);
            return next(error);
        }


        const cat = await CategoryModel.findOne({ categoryName: category });

        if (!cat) {
            const error = errorHandler(400, 'Valid Category Name Required for Add Podcast!', err.message);
            return next(error);
        }

        const catId = cat._id;

        const userId = req.user.id;

        const newPodcast = await PodcastModel.create({
            title,
            description,
            category: catId,
            user: userId,
            frontImage,
            audioFile
        });

        await CategoryModel.findByIdAndUpdate(catId, { $push: { podcasts: newPodcast._id } });

        await UserModel.findByIdAndUpdate(userId, { $push: { podcasts: newPodcast._id } });

        res.status(201).json({
            success: true,
            message: 'Add New Podcast Success!',
            data: newPodcast

        })
    } catch (err) {
        const error = errorHandler(500, 'Add Podcast Failed!', err.message);
        next(error);
    }

}


export const getPodcasts = async (req, res, next) => {
    try {

        const response = await PodcastModel.find().populate("category").sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            message: 'Get All Podcast Success!',
            data: response

        })


    } catch (err) {
        const error = errorHandler(500, 'Get All Podcast Failed!', err.message);
        next(error);
    }
}

export const getUserPodcasts = async (req, res, next) => {
    try {

        const  userId  = req.user.id;




        const response = await UserModel.findById(userId).populate({
            path: "podcasts",
            populate: { path: 'category' }
        }).select("-password");

        
        

        if (response && response.podcasts.length > 0) {
            response.podcasts.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
        }


        res.status(200).json({
            success: true,
            message: 'Get All User Podcasts Success!',
            data: response.podcasts

        })


    } catch (err) {
        const error = errorHandler(500, 'Get All User Podcast Failed!', err.message);
        next(error);
    }
}


export const getPodcastById = async (req, res, next) => {
    try {

        const { podcastId } = req.params;

        const response = await PodcastModel.findById(podcastId).populate("category");


        res.status(200).json({
            success: true,
            message: 'Get  Podcast by id Success!',
            data: response

        })



    } catch (err) {
        const error = errorHandler(500, 'Get Podcast by id Failed!', err.message);
        next(error);
    }
}

export const getPodcastByCategory = async (req, res, next) => {
    try {

        const { categoryName } = req.params;

        const response = await CategoryModel.findOne({ categoryName }).populate({
            path: "podcasts",
            populate: { path: 'category' }
        });

        
        

        if (response && response.podcasts?.length > 0) {
            response.podcasts.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
        }


        res.status(200).json({
            success: true,
            message: 'Get  Podcast by Category Success!',
            data: response?.podcasts || []

        })



    } catch (err) {
        const error = errorHandler(500, 'Get Podcast by Category Failed!', err.message);
        next(error);
    }
}