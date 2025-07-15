const ContactSubmission = require('../models/ContactSubmission');
const { body, validationResult } = require('express-validator');

exports.submitContact = [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const submission = new ContactSubmission(req.body);
      await submission.save();
      res.status(201).json({ message: 'Submission received' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];
