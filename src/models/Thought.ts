import { Schema, Types, Document, ObjectId, model } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    ceratedAt: Date;
    username: string,
    reactions?: [IReaction]
}

interface IReaction extends Document {
    reactionId: ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        ceratedAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            type: [reactionSchema]
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
})

const Thought = model('Thought', thoughtSchema);

export default Thought;