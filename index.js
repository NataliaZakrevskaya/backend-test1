import express from 'express'
import mongoose from 'mongoose'
import {
    createPostValidation,
    loginValidation,
    registerValidation,
    createServiceCategoryValidation, createServiceSubcategoryValidation
} from './validations.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import * as ServiceCategoriesController from "./controllers/ServiceCategoriesController.js";
import * as ServiceSubcategoryController from "./controllers/ServiceSubcategoriesController.js";

//connect DB
mongoose
    .connect('mongodb+srv://zakrevskayanatalia97:zak30051997@cluster0.tpkxtvd.mongodb.net/blog')
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.log(err, 'error'));

// create express app
const app = express()
// use json in project
app.use(express.json())

//requests Auth
app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)

//requests Posts
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, createPostValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

//requests Service Categories
app.get('/service-categories', ServiceCategoriesController.getAll)
app.get('/service-categories/:id', ServiceCategoriesController.getOne)
app.post('/service-categories', checkAuth, createServiceCategoryValidation, ServiceCategoriesController.create)
app.delete('/service-categories/:id', checkAuth, ServiceCategoriesController.remove)
app.patch('/service-categories/:id', checkAuth, ServiceCategoriesController.update)

//requests Service Subcategories
app.get('/service-subcategories', ServiceSubcategoryController.getAll)
app.post('/service-subcategories/find-by-category', ServiceSubcategoryController.getAllByCategory)
// app.get('/service-categories/:id', ServiceCategoriesController.getOne)
app.post('/service-categories/:categoryId', checkAuth, createServiceSubcategoryValidation, ServiceSubcategoryController.create)
// app.delete('/service-categories/:id', checkAuth, ServiceCategoriesController.remove)
// app.patch('/service-categories/:id', checkAuth, ServiceCategoriesController.update)

// Server start
app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is OK')
    }
})