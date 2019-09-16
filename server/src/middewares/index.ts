/** Middlewares de la aplicación */
import * as express from 'express';
import { Application } from 'express';
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const allowedOrigins = [
    'https://rimtodo.web.app',
    'https://hernan.homelinux.com',
    'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
};

function initMiddlewares(app: Application) {
    // Enable preflight requests for all routes
    app.options('*', cors(corsOptions));
    app.use(cors(corsOptions));
    app.use(compression());
    app.use(helmet());
    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
}

export default initMiddlewares;
