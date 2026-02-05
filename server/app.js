const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const globalErrorHandler = require("./controllers/error.controller");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Cybersecurity
const rateLimit = require("express-rate-limit");
const mongoSanitize  = require("express-mongo-sanitize");
const helmet = require("helmet");


// routers
const laptopRouter = require("./routers/laptop.router");
const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");


const app = express();

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
}

// helmet ეს არის შუამავალი ფუნქცია რომელიც გამოიყენება უსაფრთხოებისთვის ის იცავს htpp headers-ებს ავტომატურად ცვლის და ამატევს
// უსაფრთხოების header-ებს ასევე ის იცავს სერვერს XSS შეტევებისგან აკონტროლებს თუ საიდან იტვიღტება js კოდი, სურათები ან CSS.
app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json({ limit: "5mb" })); // increase JSON limit
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
// app.use("/laptops/images", path.join(__dirname, "uploads/laptops"))


// mongoSanitizer ეს არის შუამავალი ფუნქცია რომელიც გამოიყენება უსაფრთხოებისთვის ის ასუფთავებს requset-დან წამოსულ საშიშ
// mongoDB-ის ოპერატორებს ასევე ფილტრავს req.bodd–ის req.querys-ს req.params და req.headers ის შლის ოპერატორვბეს რომელბიც შეიცავს 
// $ და . რომ მომხარებელმა ვერ შეძლოს საშიში ოპერატორების გამოყენება 
app.use(mongoSanitize());

// rateLimit ეს არის შუამავალი ფუნქცია რომელიც გამოიყენება უსაფრთხოებისთვის ის ეხმარება სერვერს რომ თავი აირიდოს dos და პატარა 
// ddos შეტევებისგან და სერევრის გათიშვისგან ბევრი request-ის გაგაზვნით ის აწესებს limit-ს და დროს თუ რამდენ ხანში უნდა აღადგინო
// სრულიად limit-ი
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
}))


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