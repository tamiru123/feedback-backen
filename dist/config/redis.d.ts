import Redis from 'ioredis';
declare let redis: Redis | null;
export declare const cache: {
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    delPattern(pattern: string): Promise<void>;
    increment(key: string, ttl?: number): Promise<number>;
};
export default redis;
//# sourceMappingURL=redis.d.ts.map