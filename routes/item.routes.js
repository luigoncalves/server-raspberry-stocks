const router = require('express').Router();
const Item = require('../models/Item.model');
const mongoose = require('mongoose');

// Create a new Item on the Watchlist

router.post('/watchlist', async (req, res, next) => {
  const { title, tickerSymbol, typeOfAsset } = req.body;

  try {
    const newItem = await Item.create({
      title,
      tickerSymbol,
      typeOfAsset,
    });
    console.log('New Item', newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.log('An error occurred creating the item', error);

    next(error);
  }
});

// Get all Items from the Watchlist

router.get('/watchlist', async (req, res, next) => {
  try {
    const allItems = await Item.find({});
    console.log('All Items', allItems);
    res.status(202).json(allItems);
  } catch (error) {
    console.log('An error occurred getting the items', error);
    next(error);
  }
});

// Deleting a single Item on the Watchlist

router.delete('/watchlist/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const deleteItem = await Item.findByIdAndDelete(id);

    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.log('An error occurred deleting the item', error);
    next(error);
  }
});

module.exports = router;
