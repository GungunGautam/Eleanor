const {Category} = require('../models/category');
const {SubCategory} = require('../models/Subcat');
const express = require('express');
const router = express.Router();


router.get(`/`, async(req, res) => {
    const subcat = await SubCategory.find().populate("category");
    if(!subcat) {
        res.status(500).json({
            success: false
        })
    }
    res.send(subcat);
});


router.get('/:id', async(req, res) => {
    
    const subcat = await SubCategory.findById(req.params.id).populate("category");;
    if(!subcat) {
        res.status(500).json({
            message: 'Subcategory id not found'
        })
    }
    return res.status(200).send(subcat);
});


router.post('/create', async(req, res) => {
    
    let subcat = new SubCategory({
        category: req.body.category,
        subcat: req.body.subcat,
    });

    if(!subcat) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    subcat = await subcat.save();

    res.status(201).json(subcat);
});


router.put('/:id', async(req, res) => {

    const subcat = await SubCategory.findByIdAndUpdate(
        req.params.id,
        {
            category: req.body.category,
        subcat: req.body.subcat,
        },
        {new: true}
    )
    if(!subcat) {
        return res.status(500).json({
            message: 'Subcategory not found',
            success: false
        })
    }
    res.send(subcat);
})


router.delete('/:id', async(req, res) => {
    const deletesubcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if(!deletesubcategory) {
        res.status(404).json({
            message: 'Subcategory not found',
            success: false
        })
    }
    res.status(200).json({
        success: true,
        message: 'Subcategory deleted'
    })
});

module.exports = router;