const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")


const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 6000;

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log(err);

    })



const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

