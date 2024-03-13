const router = require('express').Router();
const Item = require('../models/Item.model');
const mongoose = require('mongoose');

// Get all Items from the Watchlist for the given User

router.get('/watchlist/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const allUserItems = await Item.find({ userId: id });
    console.log('All Items', allUserItems);
    res.status(202).json(allUserItems);
  } catch (error) {
    console.log('An error occurred getting the items', error);
    next(error);
  }
});

// Create a new Item on the Watchlist

router.post('/:typeOfAsset/:tickerSymbol', async (req, res, next) => {
  // const { title, tickerSymbol, typeOfAsset, userId } = req.body;

  const { title, userId } = req.body;
  const { tickerSymbol, typeOfAsset } = req.params;

  const itemExists = await Item.findOne({ tickerSymbol, userId });

  console.log('this is itemExists:', itemExists);

  if (itemExists) {
    return res.status(400).json({ message: 'Item already on your watchlist' });
  }

  try {
    const newItem = await Item.create({
      title,
      tickerSymbol,
      typeOfAsset,
      userId,
    });
    console.log('New Item', newItem);

    res.json({
      title: newItem.title,
      tickerSymbol: newItem.tickerSymbol,
      typeOfAsset: newItem.typeOfAsset,
      userId: newItem.userId,
      _id: newItem._id,
    });
  } catch (error) {
    console.log('An error occurred creating the item', error);

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
