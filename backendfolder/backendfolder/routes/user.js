const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post(`/signup`, async(req, res) => {
    const {name, phone, email, password, address} = req.body;

    try{

        const existingUser = await User.findOne({email: email});

        if(existingUser) {
            res.status(400).json({status: false, msg: "user already exist!"})
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            name: name, 
            phone: phone,
            email: email,
            password: hashPassword,
            address: address,
        });

        const token = jwt.sign({email: result.email, id: result._id}, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            user: result,
            token: token,
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Something went wrong"});
    }
})

router.post(`/signin`, async(req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email: email});

        if(!existingUser) {
            res.status(404).json({msg: "User not found"})
        }

        const matchpassword = await bcrypt.compare(password, existingUser.password);

        if(!matchpassword) {
            return res.status(400).json({msg: "Invalid credentials"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            user: existingUser,
            token: token,
            msg: "Welcome"
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Something went wrong"});
    }
})


router.get(`/`, async(req, res) => {
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false});
    }
    res.send(userList);
})


router.get(`/:id`, async(req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(500).json({msg: "The user with the given id was not found"})
    }
    res.status(200).send(user);
})


router.delete(`/:id`, async(req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        if(user) {
            return res.status(200).json({success: true, msg: "User was deleted"})
        } else {
            return res.status(404).json({success: false, msg: "User not found"})
        }
    }).catch(err => {
        return res.send(500).json({success: false, error: err})
    })
})


router.put(`/update`, async(req, res) => {
    const {name, phone, email, password, address} = req.body;

    const userExist = await User.findOne({email : email});

    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.hashPassword;
    }

    const user = await User.findOneAndUpdate(
        {email: email} ,
        {
            name: name,
            phone: phone,
            email: email,
            password: newPassword,
            address: address,
        },
        {new: true}
    )

    if(!user)
        return res.status(400).send("User can't be updated")
    
    res.status(200).send("user data is updated successfully");

})

module.exports = router;