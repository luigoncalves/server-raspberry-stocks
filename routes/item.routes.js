const router = require('express').Router();
const Item = require('../models/Item.model');
const mongoose = require('mongoose');
// const fileUploader = require('../config/cloudinary.config');

// Create a new Item

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
    console.log('An error occurred creating the project', error);
    // next calls the error-handling
    next(error);
  }
});

module.exports = router;
