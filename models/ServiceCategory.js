import mongoose from 'mongoose'

const ServiceCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    subcategories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceSubcategory'
        }],
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    imageUrl: String
}, {
    timestamps: true
})

export default mongoose.model('ServiceCategory', ServiceCategorySchema)