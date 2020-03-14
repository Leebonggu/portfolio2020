import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection();

const db = mongoose.connection;

const handleOpen = () => {
  console.log('Connect To Db');
};

const handleError = (err) => {
  console.log(`Bad request: ${err}`);
};

db.once('open', handleOpen);
db.on('error', handleError);