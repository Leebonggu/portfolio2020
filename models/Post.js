import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    username: String,
  }
});

const model = mongoose.model('Post', PostSchema);

export default model;