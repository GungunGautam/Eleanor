const { Category } = require('../models/category');
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
    const category = await Category.find();
    if (!category) {
        res.status(500).json({
            success: false
        })
    }
    res.send(category);
});


router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({
            message: 'category id not found'
        })
    }
    return res.status(200).send(category);
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

    let category = new Category({
        name: req.body.name,
        images: imgurl,
    });

    if (!category) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    category = await category.save();

    res.status(201).json(category);
});


router.put('/:id', async (req, res) => {
    
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            images: imgurl,
        },
        { new: true }
    );

    if (!category) {
        res.status(404).json({
            message: 'category not updated',
            success: false,
        })
    }
    res.status(200).json({
        message: 'category updated',
        status: true
    })
})


router.delete('/:id', async (req, res) => {
    const deletecategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletecategory) {
        return res.status(404).json({
            message: 'category id not found',
            status: false
        })
    }
    res.status(200).send({
        message: 'category deleted',
        status: true
    })
})


module.exports = router;