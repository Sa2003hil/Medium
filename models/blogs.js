import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImgURL: {
        type: String,
        required: false
    },
    createdBY: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Blog = model('Blog', blogSchema);

export default Blog;
