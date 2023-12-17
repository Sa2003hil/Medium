import express from 'express';
import multer from 'multer';
import path from 'path';
import Blog from '../models/blogs.js';
const router = express.Router();


// creating disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})

// creating upload instace
const upload = multer({ storage: storage });

router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user: req.user
    })
})

router.post('/', upload.single('coverImage'), async (req, res) => {

    const { title, content } = req.body;
    const blog = await Blog.create({
        title,
        content,
        createdBY: req.user._id,
        coverImgURL: `/uploads/${req.file.filename}`
    });

    // console.log(req.body);
    // console.log(req.file);
    // return res.redirect(`/blog/${blog._id}`);
    return res.redirect(`/`);
})


export default router;