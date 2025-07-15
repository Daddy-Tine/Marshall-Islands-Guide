const Listing = require('../models/Listing');
const { body, validationResult } = require('express-validator');

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find({ category: req.params.category });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createListing = [
  body('name').notEmpty().trim(),
  body('category').isIn(['business', 'accommodation', 'transportation', 'government']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const listing = new Listing(req.body);
      await listing.save();
      res.status(201).json(listing);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];
