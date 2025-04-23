const express = require('express');
const router = express.Router();
const { calculateRidePrice, createConfig, listConfigs } = require('../services/pricingController');

router.post('/calculate', calculateRidePrice);
router.post('/config', createConfig);
router.get('/configs', listConfigs);

module.exports = router;
