import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const authUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User authenticated successfully' });
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json({ message: 'User registered successfully' });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User logged out successfully' });
});

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User profile fetched successfully' });
});

export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User profile updated successfully' });
});