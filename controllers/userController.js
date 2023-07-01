const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userController = {
    registerUser: async (req, res) => {
        try {
            const {username, email, password} = req.body;
            const user = await User.findOne({email: email});
            if(user) {
                return res.status(500).json({
                    message: 'Email already exists.'
                });
            }

            if(!validator.isEmail(email)) {
                return res.status(500).json({
                    message: 'Please provide a valid email.'
                });
            }

            if(password.length < 8) {
                return res.status(500).json({
                    message: 'Password must be at least 8 characters.'
                });
            }

            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new User ({
                username,
                email,
                password: passwordHash
            });

            await newUser.save();

            res.status(200).json({
                status: 'success',
                data: {
                    newUser
                },
                message: 'User registered successfully, login to continue!'
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email: email});

            if(!user) {
                return res.status(400).json({
                    message: 'User does not exist.'
                });
            }

            const doesMatch = await bcrypt.compare(password, user.password);

            if(!doesMatch) {
                return res.status(400).json({
                    message: 'Incorrect password.'
                });
            }

            // login success, create token
            const payload = {id: user.id, name: user.username};
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "30d"});

            return res.status(200).json({
                status: 'success',
                data: {
                    token
                },
                message: 'User logined successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    verifiedToken: async (req, res) => {
        try {
            const token = await req.header('Authorization');
            if(!token) {
                return res.send(false);
            }

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if(err) {
                    return res.send(false);
                }

                const user = await User.findOne(verified._id);
                if(!user) {
                    return res.send(false);
                }

                return res.send(true);
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = userController;