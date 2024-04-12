const express = require('express');
const cookieParser = require('cookie-parser');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/campaign', viewController.getCampaign);
router.get('/login', viewController.getLogin);
router.get('/signup', viewController.getSignUp);
router.get('/logout', viewController.getLogOut);

module.exports = router;
