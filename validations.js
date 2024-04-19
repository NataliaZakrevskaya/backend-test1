import {body} from 'express-validator'

export const registerValidation = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 5}).withMessage('Password is required'),
    body('fullName').isLength({min: 3}).withMessage('Password is required'),
    body('avatarUrl').optional().isURL(),
]
export const loginValidation = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 5}).withMessage('Password is required'),
]
export const createPostValidation = [
    body('title', 'Укажите заголовок статьи').isString().isLength({min: 3}),
    body('text', 'Укажите текст статьи').isLength({min: 5}),
    body('tags').optional().isString(),
    body('imageUrl').optional().isString(),
]
export const createServiceCategoryValidation = [
    body('title', 'Укажите заголовок категории').isString().isLength({min: 3}),
    body('description').optional().isLength({min: 5}),
    body('subcategories').optional().isArray(),
    body('imageUrl').optional().isString(),
]
export const createServiceSubcategoryValidation = [
    body('title', 'Укажите заголовок категории').isString().isLength({min: 3}),
    body('description').optional().isLength({min: 5}),
    body('specialists').optional().isArray(),
    body('imageUrl').optional().isString(),
]