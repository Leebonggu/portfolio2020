import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

});

const model = mongoose.model('User', UserSchema);

export default model;