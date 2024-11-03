import CategoryModel from "../models/categoryModel.js";
import { errorHandler } from "../helper/error.js";

export const addCategory = async(req, res, next)=>{

    try{

        const { categoryName } = req.body;

        if(!categoryName?.trim()){
            const error = errorHandler(400, 'Please Add Category Name!');
            return next(error);
        }

        const categoryExists = await CategoryModel.findOne({categoryName});

        if(categoryExists){
            const error = errorHandler(400, 'Category Name is alredy Exists!');
            return next(error);
        }

        const responce = await CategoryModel.create({categoryName});

        res.status(200).json({
            success: true,
            message: 'Add Category success!',
            data: responce

        })
    }catch(err){
        const error = errorHandler(500, 'Add  Category Failed!', err.message);
        next(error);
    }


}

export const getAllCategories = async(req, res, next)=>{

    try{

        
        const response = await CategoryModel.find();


        res.status(200).json({
            success: true,
            message: 'Get All Categories success!',
            data: response

        })
    }catch(err){
        const error = errorHandler(500, 'Get All Categories  Failed!', err.message);
        next(error);
    }


}