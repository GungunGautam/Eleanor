const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: [
        {
            type: String,
            required: true,
        }
    ],
    images: [
        {
            type: String,
            required: true,
        }
    ],
    brand: {
        type: String,
        default: '',
    },
    banner: {
        type: String,
        required: true,
    },
    newprice: {
        type: Number,
        default: 0,
    },
    oldprice: {
        type: Number,
        default: 0,
    },
    catName: {
        type: String,
        default: '',
    },
    subcatName: {
        type: String,
        default: '',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    countInStock: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    productsize: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);