import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
// import { Thought, Reaction, User } from '../models/index.js'
import { User } from '../models/index.js'

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err: any) {
        res.status(500).json(err);
    }
}

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        );

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: "No user found" });
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (user) {
            return res.json({ message: "User deleted" });
        } else {
            return res.status(404).json({ message: "No user found" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}