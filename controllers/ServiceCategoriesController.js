import ServiceCategorySchema from "../models/ServiceCategory.js";
import ServiceCategory from "../models/ServiceCategory.js";

export const getAll = async (req, res) => {
    try {
        const categories = await ServiceCategorySchema.find()
        res.json(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не получилось загрузить категории услуг",
        })
    }
}

export const getOne = async (req, res) => {
    try {

        const categoryId = req.params.id
        await ServiceCategorySchema.findOneAndUpdate(
            {
                _id: categoryId,
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            })
            .then(category => {
                if (!category) {
                    return res.status(404).json({message: 'Не удалось найти категорию'})
                }
                res.json(category)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'Не удалось найти категорию'})
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось найти категорию'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new ServiceCategory({
            title: req.body.title,
            description: req.body.description,
            subcategories: req.body.subcategories,
            imageUrl: req.body.imageUrl,
        });

        const category = await doc.save()
        res.json(category)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: `Не удалось создать категорию`,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const categoryId = req.params.id
        await ServiceCategory.findOneAndDelete({
            _id: categoryId
        })
            .then(category => {
                if (!category) {
                    return res.status(404).json({ message: 'Не удалось найти категорию для удаления' })
                }
                res.json({
                    message: 'Категория удалена успешно'
                })
            })
            .catch(err => res.status(500).json({message: 'Не удалось найти категорию для удаления'}))
    } catch (err) {
        res.status(500).json({message: 'Не удалось найти категорию для удаления'})
    }
}

export const update = async (req, res) => {
    try{
        const categoryId = req.params.id
        await ServiceCategory.updateOne({
            _id: categoryId,
        }, {
            title: req.body.title,
            description: req.body.description,
            subcategories: req.body.subcategories,
            imageUrl: req.body.imageUrl,
        })
        res.json({ message: 'Статья обновлена успешно'})
    } catch(err){
        console.log(err)
        res.status(500).json({ message: 'Не удалось обновить категорию'})
    }
}