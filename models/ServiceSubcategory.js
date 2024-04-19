import mongoose from 'mongoose'

const ServiceSubcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    specialists: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCategory',
    }
}, {
    timestamps: true
})

export default mongoose.model('ServiceSubcategory', ServiceSubcategorySchema)