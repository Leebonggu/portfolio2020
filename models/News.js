import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({

});

const model = mongoose.model('News', NewsSchema);

export default model;