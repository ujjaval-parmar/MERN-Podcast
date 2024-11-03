import { Router } from 'express'
import { addCategory, getAllCategories } from '../controllers/categoriesController.js';







const categoryRouter = Router();


categoryRouter.post('/add-category', addCategory);

categoryRouter.get('/get-all-categories', getAllCategories);


export default categoryRouter