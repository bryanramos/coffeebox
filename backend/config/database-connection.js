import mongoose from 'mongoose';

export const connectDatabase = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.error(error);
    }
}