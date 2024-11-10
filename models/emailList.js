import { Schema, model, models } from "mongoose";

const subscriptionSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        trim: true,
    }
});

const emailList = models.emailList || model('emailList', subscriptionSchema);
export default emailList;
