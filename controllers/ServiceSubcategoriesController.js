import ServiceCategory from "../models/ServiceCategory.js";
import ServiceSubcategory from "../models/ServiceSubcategory.js";
import ServiceSubcategorySchema from "../models/ServiceSubcategory.js";

export const getAll = async (req, res) => {
    try {
        console.log('~hello')
        const subcategories = await ServiceSubcategorySchema.find();
        res.json(subcategories)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не получилось загрузить подкатегории услуг",
        })
    }
}
export const getAllByCategory = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const subcategories = await ServiceSubcategorySchema.find({
            category: categoryId
        });
        res.json(subcategories)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не получилось загрузить подкатегории услуг",
        })
    }
}

// export const getOne = async (req, res) => {
//     try {
//
//         const categoryId = req.params.id
//         await ServiceCategorySchema.findOneAndUpdate(
//             {
//                 _id: categoryId,
//             },
//             {
//                 $inc: {viewsCount: 1}
//             },
//             {
//                 returnDocument: 'after'
//             })
//             .then(category => {
//                 if (!category) {
//                     return res.status(404).json({message: 'Не удалось найти категорию'})
//                 }
//                 res.json(category)
//             })
//             .catch(err => {
//                 console.log(err)
//                 res.status(500).json({message: 'Не удалось найти категорию'})
//             })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Не удалось найти категорию'
//         })
//     }
// }

export const create = async (req, res) => {
    try{
    const { categoryId } = req.params;
    const { title, description, specialists, imageUrl } = req.body;

    const category = await ServiceCategory.findById(categoryId).populate('subcategories');
    if (!category) {
        return res.status(404).json({ message: 'Категория не найдена' });
    }

    const subcategory = new ServiceSubcategory({
        title,
        description,
        specialists,
        imageUrl,
        category: categoryId,
    });
    await subcategory.save();

    await category.subcategories.push(subcategory);
    await category.save();

    res.json({
        message: 'Подкатегория создана успешно'
    });
    } catch (err) {
        // console.log(err)
        res.status(500).json({ message: 'Не удалось создать подкатегорию' });
    }
}

// export const remove = async (req, res) => {
//     try {
//         const categoryId = req.params.id
//         await ServiceCategory.findOneAndDelete({
//             _id: categoryId
//         })
//             .then(category => {
//                 if (!category) {
//                     return res.status(404).json({ message: 'Не удалось найти категорию для удаления' })
//                 }
//                 res.json({
//                     message: 'Категория удалена успешно'
//                 })
//             })
//             .catch(err => res.status(500).json({message: 'Не удалось найти категорию для удаления'}))
//     } catch (err) {
//         res.status(500).json({message: 'Не удалось найти категорию для удаления'})
//     }
// }

// export const update = async (req, res) => {
//     try{
//         const categoryId = req.params.id
//         await ServiceCategory.updateOne({
//             _id: categoryId,
//         }, {
//             title: req.body.title,
//             description: req.body.description,
//             subcategories: req.body.subcategories,
//             imageUrl: req.body.imageUrl,
//         })
//         res.json({ message: 'Статья обновлена успешно'})
//     } catch(err){
//         console.log(err)
//         res.status(500).json({ message: 'Не удалось обновить категорию'})
//     }
// }