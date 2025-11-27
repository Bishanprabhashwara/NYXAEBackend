const userService = require('../services/UserService');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('No authentication token provided');
        }

        const user = await userService.verifyToken(token);
        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Please authenticate',
            error: error.message
        });
    }
};

module.exports = auth;
