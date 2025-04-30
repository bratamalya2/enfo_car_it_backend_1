import express from 'express';

import pricingController from '../services/pricingController.js';

const router = express.Router();

router.post('/calculate', pricingController.calculateRidePrice);
router.post('/config', pricingController.createConfig);
router.get('/configs', pricingController.listConfigs);
router.post('/bookARide', pricingController.bookARide);
router.post('/startARide', pricingController.startARide);
router.post('/finishARide', pricingController.finishARide);

export default router;
