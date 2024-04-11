const Campaign = require('./../models/campaignModel');
const handler = require('./../controllers/handlerController');

exports.getAllCampaigns = handler.getAll(Campaign);
exports.getCampaign = handler.getOne(Campaign, { path: 'reviewsVirtual' });
exports.createCampaign = handler.createOne(Campaign);
exports.updateCampaign = handler.updateOne(Campaign);
exports.deleteCampaign = handler.deleteOne(Campaign);
