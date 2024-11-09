import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'scholarship'
        });

        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(error);
    }
}; 

export default connectDB;