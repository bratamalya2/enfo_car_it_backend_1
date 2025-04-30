import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { ComponentLoader } from 'adminjs';
import * as url from 'url'

import PricingConfig from './models/pricingConfig.js';
import ConfigLog from './models/configLog.js';
import RideData from './models/rideData.js';

import pricingRoutes from './routes/pricingRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const componentLoader = new ComponentLoader();

const Components = {
    Dashboard: componentLoader.add('Dashboard', './components/dashboard.jsx'),
    // other custom components
};

const start = async () => {
    const app = express()

    const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

    app.use(express.static(__dirname + '/public'));

    app.use(express.json());

    // Routes
    app.use('/api/pricing', pricingRoutes);

    // DB Connection
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pricing-module', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });

    AdminJS.registerAdapter({
        Resource: AdminJSMongoose.Resource,
        Database: AdminJSMongoose.Database,
    });

    const adminOptions = {
        // We pass Category to `resources`
        resources: [PricingConfig, ConfigLog, RideData],
        dashboard: {
            component: Components.Dashboard
        },
        componentLoader
    }
    // Please note that some plugins don't need you to create AdminJS instance manually,
    // instead you would just pass `adminOptions` into the plugin directly,
    // an example would be "@adminjs/hapi"
    const admin = new AdminJS(adminOptions);

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()
