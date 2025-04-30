import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
    name: String,
    active: Boolean,
    basePrices: [
        {
            days: [String], // ['Mon', 'Tue']
            upToKm: Number,
            price: Number
        }
    ],
    additionalPerKm: Number,
    timeMultipliers: [
        {
            fromHour: Number,
            toHour: Number,
            multiplier: Number
        }
    ],
    waitingChargePer3Min: Number,
    freeWaitingMins: Number
}, { timestamps: true });

export default mongoose.model('PricingConfig', pricingSchema);
