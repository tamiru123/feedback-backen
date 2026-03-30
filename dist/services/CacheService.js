"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const redis_1 = require("../config/redis");
class CacheService {
    async get(key) {
        return redis_1.cache.get(key);
    }
    async set(key, value, ttl = 3600) {
        await redis_1.cache.set(key, value, ttl);
    }
    async del(key) {
        await redis_1.cache.del(key);
    }
    async delPattern(pattern) {
        await redis_1.cache.delPattern(pattern);
    }
    async increment(key, ttl) {
        return redis_1.cache.increment(key, ttl);
    }
    async remember(key, factory, ttl = 3600) {
        const cached = await this.get(key);
        if (cached)
            return cached;
        const value = await factory();
        await this.set(key, value, ttl);
        return value;
    }
}
exports.CacheService = CacheService;
//# sourceMappingURL=CacheService.js.map