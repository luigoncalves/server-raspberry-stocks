const { Schema, model, mongoose } = require('mongoose');

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  tickerSymbol: {
    type: String,
    required: [true, 'Ticker Symbol is required'],
    uppercase: true,
  },
  typeOfAsset: {
    type: String,
    required: [true, 'Type of Asset required'],
    enum: ['stock', 'etf', 'crypto', 'commodity', 'forex'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Item = model('Item', itemSchema);

module.exports = Item;
