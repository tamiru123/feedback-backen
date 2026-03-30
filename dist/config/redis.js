"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Redis configuration with error handling
let redis = null;
try {
    redis = new ioredis_1.default({
        host: process.env.REDIS_HOST || '192.168.8.10',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || undefined,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        maxRetriesPerRequest: 3,
    });
    redis.on('connect', () => {
        console.log('✅ Redis connected');
    });
    redis.on('error', (error) => {
        console.log('⚠️ Redis error (cache disabled):', error.message);
        redis = null;
    });
}
catch (error) {
    console.log('⚠️ Redis connection failed, running without cache');
    redis = null;
}
// Cache service with fallback for when Redis is unavailable
exports.cache = {
    async get(key) {
        if (!redis)
            return null;
        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        }
        catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    },
    async set(key, value, ttl = 3600) {
        if (!redis)
            return;
        try {
            await redis.setex(key, ttl, JSON.stringify(value));
        }
        catch (error) {
            console.error('Redis set error:', error);
        }
    },
    async del(key) {
        if (!redis)
            return;
        try {
            await redis.del(key);
        }
        catch (error) {
            console.error('Redis del error:', error);
        }
    },
    async delPattern(pattern) {
        if (!redis)
            return;
        try {
            const keys = await redis.keys(pattern);
            if (keys.length) {
                await redis.del(...keys);
            }
        }
        catch (error) {
            console.error('Redis delPattern error:', error);
        }
    },
    async increment(key, ttl) {
        if (!redis)
            return 0;
        try {
            const count = await redis.incr(key);
            if (ttl && count === 1) {
                await redis.expire(key, ttl);
            }
            return count;
        }
        catch (error) {
            console.error('Redis increment error:', error);
            return 0;
        }
    }
};
exports.default = redis;
//# sourceMappingURL=redis.js.map