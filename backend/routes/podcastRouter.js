import { Router } from 'express'
import { verifyToken } from '../helper/verifyToken.js';
import { addPodcast, getPodcastByCategory, getPodcastById, getPodcasts, getUserPodcasts } from '../controllers/podcastConrollers.js';
import upload from '../helper/multer.js';

const podcastRouter = Router();

podcastRouter.post('/add-podcast', verifyToken, upload,  addPodcast);
podcastRouter.get('/get-podcasts', getPodcasts);

podcastRouter.get('/get-user-podcasts', verifyToken, getUserPodcasts);

podcastRouter.get('/get-podcast/:podcastId', getPodcastById);

podcastRouter.get('/get-category-podcasts/:categoryName', getPodcastByCategory);


export default podcastRouter