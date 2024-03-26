import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    name: {type: String, required: true},
    prompt : {type: String, required: true},
    photo : {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Post = mongoose.model('Post', PostSchema);

export default Post;