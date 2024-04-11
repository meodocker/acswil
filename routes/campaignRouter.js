const express = require('express');
const campaignController = require('../controllers/campaignController');
const authController = require('../controllers/authController');
// merge routes to save code reuse in both campaignRouter and reviewRouter
const reviewRouter = require('./../routes/reviewRouter');

const router = express.Router();

// unused after the merge routes are done
// router
//   .route('/:campaignId/reviews')
//   .post(authController.protect, reviewController.createReview);
// then we use this instead
router.use('/:campaignId/reviews', reviewRouter);

router
  .route('/')
  .get(campaignController.getAllCampaigns)
  .post(
    authController.protect,
    campaignController.setCampaignAuthorId,
    campaignController.createCampaign,
  );
router
  .route('/:id')
  .get(campaignController.getCampaign)
  .patch(campaignController.updateCampaign)
  .delete(campaignController.deleteCampaign);

module.exports = router;
