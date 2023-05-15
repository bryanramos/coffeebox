import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categories-controller.js';

export const router = Router();

router.route('/')
    .post(createCategory)
    .get(getCategories);

router.route('/:cid')
    .post(updateCategory)
    .get(getCategoryById);