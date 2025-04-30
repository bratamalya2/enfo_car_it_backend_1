import mongoose from 'mongoose';

const configLogSchema = new mongoose.Schema({
    configId: mongoose.Schema.Types.ObjectId,
    changes: mongoose.Schema.Types.Mixed,
    actor: String,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ConfigLog', configLogSchema);
