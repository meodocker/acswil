const Campaign = require('../models/campaignModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // Get all campaigns from the database
  const campaigns = await Campaign.find();

  // Build template

  // Render the campaigns - old UI
  // res.status(200).render('overview', {
  //   title: 'All Campaigns',
  //   campaigns,
  // });
  res.status(200).render('omg', {
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

// exports.getLogOut = catchAsync(async (req, res) => {
//   res.status(200).render('logout', {
//     title: 'Log Out',
//   });
// });

exports.getLogOut = catchAsync(async (req, res, next) => {
  try {
    res.cookie('jwt', 'loggedout', {
      expires: parseInt(new Date(Date.now() + 10 * 1000), 10),
      httpOnly: true,
    });
  } catch (err) {
    console.log(err);
    return res.end('err');
  }
  res.status(200).redirect('/');
});
