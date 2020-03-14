import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({

});

const model = mongoose.model('Post', PostSchema);

export default model;