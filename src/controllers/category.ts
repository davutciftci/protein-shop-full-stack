import { NextFunction, Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/category";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activeOnly = req.query.activeOnly === 'true';
        const categories = await getAllCategories(activeOnly);

        res.status(200).json({
            status: 'success',
            result: categories.length,
            data: categories,
        })
    } catch (error) {
        next(error);
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const category = await getCategoryById(id);

        res.status(200).json({
            status: 'success',
            result: category,
        })
    } catch (error) {
        next(error);
    }
}

export const createdNewCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await createCategory(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Kategori başarıyla oluşturuldu',
            data: category,
        })
    } catch (error) {
        next(error);
    }
}

export const updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const category = await updateCategory(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Kategori başarıyla güncellendi',
            data: category,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await deleteCategory(id);

        res.status(204).send();
    } catch (error) {
        next(error)
    }
}