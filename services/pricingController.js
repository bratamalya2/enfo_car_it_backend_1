import PricingConfig from '../models/pricingConfig.js';
import ConfigLog from '../models/configLog.js';
import RideData from '../models/rideData.js';
import { calculatePrice } from '../services/pricingCalculator.js';
import calculateDistance from './calculateDistance.js';

const calculateRidePrice = async (req, res) => {
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

const createConfig = async (req, res) => {
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

const listConfigs = async (req, res) => {
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

const bookARide = async (req, res) => {
    try {
        const config = await PricingConfig.findOne({ active: true });
        if (!config) return res.status(404).json({ error: 'No active config found' });

        const { startLat, startLong, endLat, endLong, rideTimeMins, waitingTimeMins, day } = req.body;

        const distance = calculateDistance(startLat, startLong, endLat, endLong);

        const price = calculatePrice(config, {
            distance,
            rideTimeMins,
            waitingTimeMins,
            day
        });

        const ride = new RideData({
            rideRequestedAt: new Date(),
            rideStartedAt: null,
            active: true,
            rideEndedAt: null,
            distanceTravelled: 0,
            approximatePrice: price,
            startLocation: {
                latitude: startLat,
                longitude: startLong
            },
            endLocation: {
                latitude: endLat,
                longitude: endLong
            }
        });
        await ride.save();
        res.status(200).json({
            success: true,
            approximatePrice: price,
            rideId: ride._id.toString()
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

const startARide = async (req, res) => {
    try {
        const config = await PricingConfig.findOne({ active: true });
        if (!config) return res.status(404).json({ error: 'No active config found' });

        const { rideId } = req.body;

        await RideData.findByIdAndUpdate(rideId, {
            rideStartedAt: new Date()
        });

        res.status(200).json({
            success: true
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

const finishARide = async (req, res) => {
    try {
        const config = await PricingConfig.findOne({ active: true });
        if (!config) return res.status(404).json({ error: 'No active config found' });

        const { rideId, waitingTimeMins, day } = req.body;

        const distance = calculateDistance(startLat, startLong, endLat, endLong);

        await RideData.findByIdAndUpdate(rideId, {
            rideEndedAt: new Date(),
            distanceTravelled: distance
        });

        const ride = await RideData.findById(rideId);

        const rideTimeMins = ride.rideEndedAt.getMinutes() - ride.rideStartedAt.getMinutes();

        const price = calculatePrice(config, {
            distance,
            rideTimeMins,
            waitingTimeMins,
            day
        })

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

export default { calculateRidePrice, createConfig, listConfigs, bookARide, startARide, finishARide };