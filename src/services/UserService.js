const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');

class UserService {
    async register(userData) {
        try {
            const { email, password } = userData;

            // Check if user already exists
            const existingUser = await userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Create new user
            const user = await userRepository.create({ email, password });

            // Generate JWT token
            const token = this.generateToken(user._id);

            return {
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: user._id,
                        email: user.email
                    },
                    token
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async login(credentials) {
        try {
            const { email, password } = credentials;

            // Find user by email
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Check password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            // Generate JWT token
            const token = this.generateToken(user._id);

            return {
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email
                    },
                    token
                }
            };
        } catch (error) {
            throw error;
        }
    }

    generateToken(userId) {
        const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
        
        return jwt.sign({ userId }, secret, { expiresIn });
    }

    async verifyToken(token) {
        try {
            const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
            const decoded = jwt.verify(token, secret);
            
            const user = await userRepository.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

module.exports = new UserService();
