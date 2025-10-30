import { Schema, model, type Model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
