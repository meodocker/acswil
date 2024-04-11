const Campaign = require('./../models/campaignModel');
const handler = require('./../controllers/handlerController');

exports.setCampaignAuthorId = (req, res, next) => {
  //   if (!req.body.campaign) req.body.campaign = req.params.campaignId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllCampaigns = handler.getAll(Campaign);
exports.getCampaign = handler.getOne(Campaign, { path: 'reviewsVirtual' });
exports.createCampaign = handler.createOne(Campaign, { path: 'user' });
exports.updateCampaign = handler.updateOne(Campaign);
exports.deleteCampaign = handler.deleteOne(Campaign);
