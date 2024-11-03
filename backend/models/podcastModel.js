import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({

    frontImage: {
        type: String,
        required: true,
        unique: true
    },
    audioFile: {
        type: String,
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,  
    },
    description:{
        type: String,
        required: true,  
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "users",  
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: "categories",  
    }

}, { timestamps: true });

const PodcastModel =   mongoose.model('podcasts', PodcastSchema);

export default PodcastModel;


