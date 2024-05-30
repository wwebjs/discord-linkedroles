import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import config from './src/config.js';
import settings from './src/settings.js';

import path from 'path';
const __dirname = path.resolve();

/**
 * Main HTTP server used for routing requests to the appropriate handlers.
 */

const server = express();
const router = express.Router();

/**
 * Set up the settings for the express server.
 */
settings(server);

/**
 * Set up the static directories for the express server.
 */
server.use(express.static(path.join(__dirname, '/public')));
server.use(express.static(path.join(__dirname, '/pages')));

/**
 * Set up the middleware for the express server.
 */
server.use(helmet());
server.use(compression());
server.use(cookieParser(config.EXPRESS_COOKIE_SECRET));
server.use(favicon(path.join(__dirname, '/public/icons/', 'favicon.png')));

import { serverRatelimit, routeRatelimit } from './handlers/ratelimit.js'
server.use(serverRatelimit);
router.use('/discord-oauth-callback', routeRatelimit);
router.use('/update-metadata', routeRatelimit);

import Mongo from './handlers/mongo.js'
const mongo = new Mongo();
await mongo.init();
server.set('mongo', mongo);

import Github from './handlers/apollo.js'
const github = new Github();
server.set('github', github);

/**
 * Route configured in the Discord developer console which facilitates the
 * connection between Discord and any additional services you may use. 
 * To start the flow, generate the OAuth2 consent dialog url for Discord, 
 * and redirect the user there.
 */

import { verify } from './routes/verify.js'
import { base } from './routes/base.js'
import { error404 } from './routes/404.js'
import { discordOauthCallback as callback } from './routes/discord-callback.js'
//import { discordUpdateMetadata as metadata } from './routes/discord-metadata.js'

router.get('/', base);
router.get('/verify', verify);
router.get('/discord-oauth-callback', callback);
// Atm this is not available, due to safety reasons
// router.post('/update-metadata', metadata);
router.all('*', error404);

server.use('/', router);

server.listen(config.PORT, () => {
    console.log(`Server started on http://localhost:${config.PORT}`);
});

export default server;