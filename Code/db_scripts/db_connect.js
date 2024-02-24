import mongoose from "mongoose";

export const connect_db = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Connected to Database Successfully !");
    } catch (err) {
        console.log(err);
    }
};
