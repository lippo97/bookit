import mongoose from 'mongoose';
import { MONGODB_HOST, MONGODB_PORT } from './constants';

const url = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;

const options: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

export default function configure(mongoose_: typeof mongoose) {
  return mongoose_.connect(url, options);
}
