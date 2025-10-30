import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

export const authUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id.toString());
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        if (user) {
            generateToken(res, user._id.toString());
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('mernAuthToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out successfully' });
});

export const getUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        res.status(200).json({ message: 'User profile fetched successfully' });
    }
);

export const updateUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        res.status(200).json({ message: 'User profile updated successfully' });
    }
);
