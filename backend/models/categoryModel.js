import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    podcasts: [{
        type: mongoose.Types.ObjectId,
        ref: 'podcasts'
    }]

}, { timestamps: true });

const CategoryModel =   mongoose.model('categories', CategorySchema);

export default CategoryModel;


