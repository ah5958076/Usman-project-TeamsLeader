const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();


mongoose.connect(process.env.MONGO_URI).then((val) => {
    console.log("MongoDB Connection Succeeded.");
}).catch((e) => {
    console.log("Error: ", e);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/user", require("./routes/users"));


const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
