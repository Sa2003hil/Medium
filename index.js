import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { checkForAuthCookie } from './middleware/authentication.js';
import favicon from 'serve-favicon';   // favicon
const app = express();

import userRouter from './routes/user.js';
import blogRouter from './routes/blogs.js'
import Blogs from './models/blogs.js';

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/medium', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected!!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


// we are using ejs for client-side rendering
app.set('view engine', 'ejs');

// set views directory
app.set('views', path.resolve('views'));

// favicon
app.use(favicon(path.resolve('public', 'images', 'images.png')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static('public'));

// home route
app.get('/', async (req, res) => {
    const allBlogs = await Blogs.find({}).sort({ createdAt: -1 }).populate('createdBY', 'username');
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});


app.use('/user', userRouter);
app.use('/blog', blogRouter);

const PORT = process.env.PORT || 3000;
// listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

