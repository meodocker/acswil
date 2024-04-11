const Campaign = require('../models/campaignModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // Get all campaigns from the database
  const campaigns = await Campaign.find();

  // Build template

  // Render the campaigns
  res.status(200).render('overview', {
    title: 'All Campaigns',
    campaigns,
  });
});

exports.getCampaign = catchAsync(async (req, res) => {
  res.status(200).render('campaign', {
    title: 'Campaign',
  });
});

exports.getLogin = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
});

exports.getSignUp = catchAsync(async (req, res) => {
  res.status(200).render('signup', {
    title: 'Register',
  });
});
