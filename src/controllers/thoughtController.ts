import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if (user) {
            res.json('Thought added');
            return;
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (thought) {
            res.json({ thought });
        } else {
            res.status(404).json({ message: "Thought not found" });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (thought) {
            return res.json({ message: "Thought deleted" });
        } else {
            return res.status(404).json({ message: "No thought found" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "No though found matching ID"});
        } else {
            return res.json(thought);
        }

    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId }}}, { runValidators: true, new: true });
        if (reaction) {
            return res.json(reaction);
        } else {
            return res.status(404).json({ message: "Reaction not found"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}