const {Productsize} = require('../models/productsize');
const express = require('express');
const router = express.Router();


router.get(`/`, async(req, res) => {
    const size = await Productsize.find();
    if(!size) {
        res.status(500).json({
            success: false
        })
    }
    res.send(size);
});


router.get('/:id', async(req, res) => {
    
    const size = await Productsize.findById(req.params.id);
    if(!size) {
        res.status(500).json({
            message: 'size id not found'
        })
    }
    return res.status(200).send(size);
});


router.post('/create', async(req, res) => {
    
    let size = new Productsize({
        productsize: req.body.productsize,
    });

    if(!size) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    size = await size.save();

    res.status(201).json(size);
});


router.put('/:id', async(req, res) => {

    const size = await Productsize.findByIdAndUpdate(
        req.params.id,
        {
            productsize: req.body.productsize,
        },
        {new: true}
    )
    if(!size) {
        return res.status(500).json({
            message: 'size not found',
            success: false
        })
    }
    res.send(size);
})


router.delete('/:id', async(req, res) => {
    const deletesize = await Productsize.findByIdAndDelete(req.params.id);
    if(!deletesize) {
        res.status(404).json({
            message: 'size not found',
            success: false
        })
    }
    res.status(200).json({
        success: true,
        message: 'size deleted'
    })
});

module.exports = router;