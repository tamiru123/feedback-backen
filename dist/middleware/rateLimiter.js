"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const redis_1 = require("../config/redis");
const rateLimiter = (windowMs = 900000, max = 100) => {
    return async (req, res, next) => {
        const key = `rate:${req.ip}:${req.path}`;
        const current = await redis_1.cache.increment(key, Math.floor(windowMs / 1000));
        if (current > max) {
            res.status(429).json({
                error: 'Too many requests, please try again later.',
                retryAfter: Math.ceil(windowMs / 1000),
            });
            return;
        }
        res.setHeader('X-RateLimit-Limit', max);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current));
        next();
    };
};
exports.rateLimiter = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map