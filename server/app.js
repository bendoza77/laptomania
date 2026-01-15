const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const globalErrorHandler = require("./controllers/error.controller");
const morgan = require("morgan");
const laptopRouter = require("./routers/laptop.router");
const userRouter = require("./routers/user.router");
const path = require("path");
const authRouter = require("./routers/auth.router");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
}

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express.json({ limit: "5mb" })); // increase JSON limit
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
// app.use("/laptops/images", path.join(__dirname, "uploads/laptops"))

// routers

app.use("/api/laptops", laptopRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

mongoose.connect(process.env.DATABASE_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log("Data base connetction", error);
    process.exit(1);
})