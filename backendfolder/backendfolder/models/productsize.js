const mongoose = require('mongoose')

const productsizeSchema = mongoose.Schema({
    productsize: {
        type: String,
        required: true,
    }
})

productsizeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productsizeSchema.set('toJSON', {
    virtuals: true,
});


exports.Productsize = mongoose.model('Productsize', productsizeSchema);
exports.productsizeSchema = productsizeSchema;