const { Category } = require('../models/category');
const { Product } = require('../models/products');
const express = require('express');
const router = express.Router();

const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.Cloudinary_config_name,
    api_key: process.env.Cloudinary_config_api_key,
    api_secret: process.env.Cloudinary_config_secret_key,
});


router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate("category subcat productsize catName subcatName");
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
});

router.get('/featured', async (req, res) => {
    const productList = await Product.find({isFeatured: true});
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
});

router.get('/category/', async (req, res) => {
    const productList = await Product.find({catName: req.query.catName}).populate("category subcat productsize catName subcatName");
    console.log("req.params.catname", req.query.catName)
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
});


router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500).json({
            message: 'category id not found'
        })
    }
    return res.status(200).send(product);
});


router.post('/create', async (req, res) => {

    const limit = pLimit(2);
    const imageupload = req.body.images.map((image) => {
        return limit(async () => {
            const result = await cloudinary.uploader.upload(image);
            return result;
        })
    });
    const uploadstatus = await Promise.all(imageupload);
    const imgurl = uploadstatus.map((item) => {
        return item.secure_url
    })

    if (!uploadstatus) {
        return res.status(500).json({
            error: 'image cannot be uploaded',
            status: false
        })
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: imgurl,
        brand: req.body.brand,
        banner: req.body.banner,
        oldprice: req.body.oldprice,
        newprice: req.body.newprice,
        catName: req.body.catName,
        subcatName: req.body.subcatName,
        category: req.body.category,
        subcat: req.body.subcat,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        reviews: req.body.reviews,
        isFeatured: req.body.isFeatured,
        productsize: req.body.productsize,
        color: req.body.color,
    });

    if (!product) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    product = await product.save();

    res.status(201).json(product);
});


router.put('/:id', async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            images: imgurl,
            brand: req.body.brand,
            banner: req.body.banner,
            oldprice: req.body.oldprice,
            newprice: req.body.newprice,
            catName: req.body.catName,
            subcatName: req.body.subcatName,
            category: req.body.category,
            subcat: req.body.subcat,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            reviews: req.body.reviews,
            isFeatured: req.body.isFeatured,
            productsize: req.body.productsize,
            color: req.body.color,
        },
        { new: true }
    );

    if (!product) {
        res.status(404).json({
            message: 'product not updated',
            success: false,
        })
    }
    res.status(200).json({
        message: 'product updated',
        status: true
    })
})


router.delete('/:id', async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
        return res.status(404).json({
            message: 'product id not found',
            status: false
        })
    }
    res.status(200).send({
        message: 'porduct deleted',
        status: true
    })
})


module.exports = router;