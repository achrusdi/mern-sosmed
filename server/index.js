import express from "express";
import RateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRoutes, userRoutes, postRoutes } from './routes/index.js';
import { register } from './controllers/auth.js';
import { createPost } from "./controllers/post.js";
import { verifyTOken } from "./middleware/auth.js";
import { users, posts } from './data/index.js';
import { User, Post } from "./models/index.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        // Ganti nama file dengan timestamp unik (misalnya, saat gambar diunggah)
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const newFileName = uniqueSuffix + "-" + file.originalname;
        cb(null, newFileName);
        // cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyTOken, upload.single("picture"), createPost);

// ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// MONGOOSE SETUP
// console.log(process.env.PORT);
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.NODE_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));

    // ADD DATA ONE TIME
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((err) => console.log(`${err} did not connect`))