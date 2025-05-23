const { Cart } = require('../models/cart');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    const cartList = await Cart.find(req.query);
    if (!cartList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(cartList);
});


router.post('/add', async (req, res) => {

    let cartList = new Cart({
        productTitle: req.body.productTitle,
        image: req.body.image,
        rating: req.body.rating,
        price: req.body.price,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
        productId: req.body.productId,
        userId: req.body.userId,
    });

    if (!cartList) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    cartList = await cartList.save();

    res.status(201).json(cartList);
});


router.put('/:id', async (req, res) => {

    const cartList = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            subTotal: req.body.subTotal,
            productId: req.body.productId,
            userId: req.body.userId,
        },
        { new: true }
    );

    if (!cartList) {
        res.status(404).json({
            message: 'cart item not updated',
            success: false,
        })
    }
    res.status(200).json({
        message: 'cart item updated',
        status: true
    })
})


router.delete('/remove', async (req, res) => {
    const cartItem = await findById(req.params.id);

    if (!cartItem) {
        res.status(404).json({ msg: "Cart item given id not found" })
    }

    const deletecartList = await Cart.findByIdAndDelete(req.params.id);
    if (!deletecartList) {
        return res.status(404).json({
            message: 'category id not found',
            status: false
        })
    }
    res.status(200).send({
        message: 'Cart item deleted',
        status: true
    })
})


module.exports = router;