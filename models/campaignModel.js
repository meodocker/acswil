const mongoose = require('mongoose');
// const Review = require('./../models/reviewModel');

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Campaign name please!'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description of your campaign please!'],
    },
    rating: { type: Number, default: 5 },
    photoUrl: { type: String, required: false },
    location: {
      type: String,
      required: [true, 'Location of your business please!'],
    },
    price: { type: Number, required: [true, 'Input the minimum price please'] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: [true, 'Campaign must belong to a business!'],
    },
    // we don't need this because we will use virtual view of 'reviews' field
    // reviews: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'review',
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

campaignSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -passwordChangedAt -email -password -role',
  });
  next();
});

// create a virtual view of the reviews field in selected campaign
campaignSchema.virtual('reviewsVirtual', {
  ref: 'review',
  foreignField: 'campaign',
  localField: '_id',
});

// then populate the virtual view when 'find*' is called
campaignSchema.pre(/^find/, function (next) {
  this.populate({ path: 'reviewsVirtual', select: '-__v -createdAt' });
  next();
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
