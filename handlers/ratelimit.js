import rateLimit from 'express-rate-limit';
import config from '../src/config.js';

import path from 'path';
const __dirname = path.resolve();

/**
 * General rate limit for all routes, to prevent API abuse.
 */
export const serverRatelimit = rateLimit({
  windowMs: config.EXPRESS_RATELIMIT_WINDOW * 60 * 1000,
  max: config.EXPRESS_RATELIMIT_MAX * 3,
  handler: function(req, res) {
    res.status(429).sendFile(path.join(__dirname, '/pages/frontend/', '429.html'));
  }
});

/**
 * Rate limit for the Discord OAuth callback routes.
 */
export const routeRatelimit = rateLimit({
  windowMs: config.EXPRESS_RATELIMIT_WINDOW * 60 * 1000,
  max: config.EXPRESS_RATELIMIT_MAX,
  handler: function(req, res) {
    res.status(429).sendFile(path.join(__dirname, '/pages/frontend/', '429.html'));
  }
});