require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pricingRoutes = require('./routes/pricingRoute.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/pricing', pricingRoutes);

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pricing-module', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
