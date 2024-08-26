import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://alhanhussain75:bcSmy9L8gQGcbMYw@cluster0.0cqx4sa.mongodb.net/block');
        console.log("Database connected");
    } catch (err) {
        console.log("Database connection error: ", err);
    }
};

export default dbConnect;
