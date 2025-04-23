const PricingConfig = require('../models/pricingConfig');
const ConfigLog = require('../models/configLog');
const { calculatePrice } = require('../services/pricingCalculator');

exports.calculateRidePrice = async (req, res) => {
    try {
        const config = await PricingConfig.findOne({ active: true });
        if (!config) return res.status(404).json({ error: 'No active config found' });

        const price = calculatePrice(config, req.body);
        res.status(200).json({
            success: true,
            price
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: 'Internal server error!'
        });
    }
};

exports.createConfig = async (req, res) => {
    try {
        const newConfig = new PricingConfig(req.body);
        await newConfig.save();

        await ConfigLog.create({
            configId: newConfig._id,
            changes: req.body,
            actor: req.body.actor || 'admin'
        });

        res.status(201).json({
            success: true,
            newConfig
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: 'Internal server error!'
        });
    }
};

exports.listConfigs = async (req, res) => {
    try {
        const configs = await PricingConfig.find();
        res.status(200).json({
            success: true,
            configs
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: 'Internal server error!'
        });
    }
};
