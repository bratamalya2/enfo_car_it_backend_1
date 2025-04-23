const mongoose = require('mongoose');

const configLogSchema = new mongoose.Schema({
    configId: mongoose.Schema.Types.ObjectId,
    changes: mongoose.Schema.Types.Mixed,
    actor: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConfigLog', configLogSchema);
