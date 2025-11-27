const User = require('../models/User');

class UserRepository {
    async create(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Email already exists');
            }
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ email: email.toLowerCase() });
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await User.findById(id).select('-password');
        } catch (error) {
            throw new Error(`Error finding user by id: ${error.message}`);
        }
    }
}

module.exports = new UserRepository();
