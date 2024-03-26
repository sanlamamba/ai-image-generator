import Post from '../models/post.js';
import { v2 as cloudinary } from 'cloudinary';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = new Post({
            name,
            prompt,
            photo: photoUrl.url,
        });
        const response = await newPost.save();
        res.status(201).json({ success: true, data: response });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

