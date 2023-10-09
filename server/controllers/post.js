import Post from '../models/Post.js';
import User from '../models/User.js';
import validator from 'validator';

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const picturePath = req.file.filename;

        if (typeof userId !== 'string') {
            return res.status(400).json({ status: 'error' })
        }

        const sanitizedDescription = validator.escape(description);
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: sanitizedDescription,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        // const post = await Post.find();
        const post = await Post.find().sort({ createdAt: -1 }).skip(0).limit(5);
        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// READ
export const getFeedPosts = async (req, res) => {
    try {
        // console.log(req.query);
        let { page } = req.query;
        const itemsPerPage = 5;
        let skip = 0;

        if (isNaN(page) || page <= 1) {
            page = 5;
        } else {
            page *= itemsPerPage;
            skip = page - itemsPerPage;
        }

        const post = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(itemsPerPage);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        let { page } = req.query;
        const { userId } = req.params;
        const itemsPerPage = 5;
        let skip = 0;

        if (isNaN(page) || page <= 1) {
            page = 5;
        } else {
            page *= itemsPerPage;
            skip = page - itemsPerPage;
        }

        const post = await Post.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(itemsPerPage);

        // console.log(typeof userId);
        // const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}