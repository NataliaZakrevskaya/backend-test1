import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if(!user){
            return res.status.status(401).send('Такого пользователя нет');
        }
        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch (err) {
        console.log(err)
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid login or password'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret-key',
            {
                expiresIn: '30d',
            }
        )

        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log('error', err)
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}
export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret-key',
            {
                expiresIn: '30d',
            }
        )

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log('error', err)
        res.status(400).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}