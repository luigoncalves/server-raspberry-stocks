const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  tickerSymbol: {
    type: String,
    required: [true, 'Ticker Symbol is required'],
    unique: true,
    uppercase: true,
  },
  typeOfAsset: {
    type: String,
    required: [true, 'Type of Asset required'],
    enum: ['stock', 'etf', 'crypto', 'commodity', 'forex'],
  },
});

const Item = model('Item', itemSchema);

module.exports = Item;
