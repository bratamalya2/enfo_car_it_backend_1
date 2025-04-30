import mongoose from 'mongoose';

const rideDataSchema = new mongoose.Schema({
    rideRequestedAt: Date,
    rideStartedAt: Date,
    active: Boolean,
    rideEndedAt: Date,
    distanceTravelled: Number,
    approximatePrice: Number,
    startLocation: {
        latitude: Number,
        longitude: Number
    },
    endLocation: {
        latitude: Number,
        longitude: Number
    }
});

export default mongoose.model('RideData', rideDataSchema);