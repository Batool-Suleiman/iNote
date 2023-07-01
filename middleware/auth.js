const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if(!token) {
            return res.status(400).json({
                message: 'Invalid authentication'
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.status(400).json({
                    message: 'Invalid authorization'
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ 
            message: error.message 
        });
    }
}

module.exports = auth;