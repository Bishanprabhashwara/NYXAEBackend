const userService = require('../services/UserService');

class UserController {
    async register(req, res) {
        try {
            const result = await userService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const result = await userService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new UserController();
