import Category from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryContoller = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({ message: 'Category already exists', success: true });


        }
        const category = new Category({ name, slug: slugify(name) });
        await category.save();
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            category: category
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: 'Error creating category',
                error
            }
        )
    }

}

export const updateCategoryContoller = async (req, res) => {

    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name) {
            return res.status(400).send({ message: 'Name is required' });
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true });
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: 'Error updating category',
                error
            }
        )
    }
}

export const CategoryContoller = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).send({
            success: true,
            category,
            message: 'Categories fetched successfully'
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: 'Error fetching categories',
                error
            }
        )
    }
}


export const singleCategoryContoller = async (req, res) => {
    try {

        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send({
            success: true,
            category,
            message: 'Category fetched successfully'
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: 'Error fetching category',
                error
            }
        )
    }
}

export const deleteCategoryContoller = async (req, res) => {
    try {

        const {id}=req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: 'Error deleting category',
                error
            }
        )
    }
}