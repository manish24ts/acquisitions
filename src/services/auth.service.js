import bcrypt from 'bcrypt';
import logger from '#config/logger.js';
import { eq } from 'drizzle-orm';
import { users } from '#models/user.model.js';
import { id } from 'zod/locales';
import database from '#config/database.js';

const { db } = database;

export const hashedPassword = async (password) => {
    try{
        return await bcrypt.hash(password, 10);
    }catch(error){
        logger.error(`Error hashing password: ${error}`);
        throw new Error('Error hashing password');
    }
};

export const createUser = async ({name, email, password, role = 'user'}) => {
    try{
        const existingUser = db.select().from(users).where(eq(users.email, email)).limit(1);
        if (existingUser.length > 0) {
            throw new Error('Email already in use');
        }

        const hashed_password = await hashedPassword(password);

        const [newUser] = await db.insert(users).values({
            name,
            email,
            password: hashed_password,
            role
        }).returning({id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt});
        logger.info(`User created with ID: ${newUser.id}`);
        return newUser;
    }catch(error){
        logger.error(`Error creating user: ${error}`);
        throw new Error('Error creating user');
    }
};