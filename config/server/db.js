import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log('Connect To Db');
};

const handleError = (err) => {
  console.log(`Bad request: ${err}`);
};

db.once('open', handleOpen);
db.on('error', handleError);