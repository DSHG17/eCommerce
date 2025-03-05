import Category from "./category.model.js"

export const defaultCategory = async () => {
    const defaultCategoryModel = {
        "name": "Tecnologia",
        "description": "Productos de teconologia"
    }

    const category = await Category.findOne({name: defaultCategory.name})
    if(!category){
        await Category.create(defaultCategoryModel)
        console.log(`Categoria creada: ${defaultCategory.name}`)
    }
}

export const createCategory = async (req, res) => {
    try {
        const data = req.body
        const category = await Category.create(data)

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while creating the category",
            error: err.message
        })
    }
}