const mongoose = require('mongoose');
const Campaign = require('./../models/campaignModel');
// const User = require('./../models/userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review must not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'campaign',
      require: [true, 'Review must belong to a campaign!'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: [true, 'Review must belong to a user!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({ path: 'campaign', select: 'name' });
  this.populate({
    path: 'user',
    select: '-__v -passwordChangedAt -email -password -role',
  });
  next();
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
