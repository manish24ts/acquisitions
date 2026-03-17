import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';

const JWT_EXPIRES_IN = '1d'; 

export const jwttoken = {
  sign: (payload) => {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      logger.error('Failed to authenticate user', { error });
      throw new Error('Failed to authenticate user token');
    }
    },
    verify: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            logger.error('Invalid token', { error });
            throw new Error('Invalid token');
        }   
    },
};