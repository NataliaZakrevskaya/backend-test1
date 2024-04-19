import Post from "../models/Post.js";
import PostSchema from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostSchema.find().populate('user').exec()
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не получилось создать статью",
        })
    }
}

export const getOne = async (req, res) => {
    try {

        const postId = req.params.id
        Post.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            })
            .then(post => {
                if (!post) {
                    return res.status(404).json({message: 'Не удалось найти статью'})
                }
                res.json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'Получение статьи пошло не так'})
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось найти статью'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: `Failed to create post: ${err.message}`,
        })
    }
}

export const remove = (req, res) => {
    try {
        const postId = req.params.id
        Post.findOneAndDelete({
            _id: postId
        })
            .then(post => {
                if (!post) {
                    return res.status(404).json({ message: 'Не удалось найти статью для удаления' })
                }
                res.json({
                    message: 'Статья удалена успешно'
                })
            })
            .catch(err => res.status(500).json({message: 'Ошибка удаления статьи'}))
    } catch (err) {
        res.status(500).json({message: 'Не удалось удалить статью'})
    }
}

export const update = async (req, res) => {
    try{
        const postId = req.params.id
        await Post.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })
        res.json({ message: 'Статья обновлена успешно'})
    } catch(err){
        console.log(err)
        res.status(500).json({ message: 'Не удалось обновить статью'})
    }
}