import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic:{
        type: String,
        default:"https://avatars.githubusercontent.com/u/154329143?v=4"
        
    },
    password:{
        type: String,
        required: true,
    },
    podcasts: [{
        type: mongoose.Types.ObjectId,
        ref: 'podcasts'
    }]

}, { timestamps: true });

const UserModel =   mongoose.model('users', UserSchema);

export default UserModel;


