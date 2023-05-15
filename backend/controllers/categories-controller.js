import { v4 as uuidv4 } from 'uuid';
import { Category } from '../models/category.js';

export const getCategories = async (request, response) => {
    try {
        const categories = await Category.find();
        
        return response.status(200).json({ categories: categories, count: categories.length });
        // TODO: Only display certain properties to client for each document instead of everything.
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
}

export const getCategoryById = async (request, response) => {
    if (!request.params.cid) return response.sendStatus(400);
    const cid = request.params.cid;

    try {
        const category = await Category.findOne({ cid: cid });
        if (!category) return response.sendStatus(404);

        return response.status(200).json({ category });
        // TODO: Only display certain properties to client when document is returned.
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
}

export const updateCategory = async (request, response) => {
    if (!request.params.cid) return response.sendStatus(400);
    const cid = request.params.cid;

    try {
        const category = await Category.findOne({ cid: cid });
        if (!category) return response.sendStatus(404);

        await Category.updateOne({ cid: cid }, { localizedProperties: request.body.localizedProperties });
        return response.sendStatus(200);
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
}

export const createCategory = async (request, response) => {
    // TODO: Validate request body coming from client
    try {
        let cid = uuidv4();

        while (true) {
            const categoryExistsWithCid = await Category.findOne({ cid: cid }).exec();
            if (!categoryExistsWithCid) break;

            cid = uuidv4();
        }

        const category = new Category({ cid: cid, localizedProperties: request.body.localizedProperties });
        await category.save();

        return response.sendStatus(201);
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
};