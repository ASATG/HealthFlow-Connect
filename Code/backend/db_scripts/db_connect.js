import mongoose from "mongoose";

export const connect_db = async (DATABASE_URL) => {
    try {
        const encodedPassword = encodeURIComponent('Anushree@2011');
        const uri = DATABASE_URL.replace('Anushree@2011', encodedPassword);

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: { version: '1', strict: true, deprecationErrors: true }
        });

        console.log("Connected to Database Successfully !");
    } catch (err) {
        console.log(err);
    }
};

let gfs;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploaded_lab_reports',
    });
});

export { gfs };