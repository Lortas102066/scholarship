import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        trim: true,
    },
    name: {
        type: String, 
        trim: true,
    },
    isPersonalInfoFilled: {
        type: Boolean,
        default: false,
    },
    education_level: {
        type: String,
        required: false
    },
    gpa: {
        type: Number,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    income: {
        type: Number,
        required: false
    }
});

const User = models.User || model('User', UserSchema);
export default User;
