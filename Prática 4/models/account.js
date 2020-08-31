import mongoose from 'mongoose';

const account = new mongoose.Schema({
  agency: {
    type: Number,
    required: true,
  },
  account: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
});

const model = mongoose.model('account', account);

export default model;
