import { cache } from '../config/redis';

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    return cache.get<T>(key);
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await cache.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await cache.del(key);
  }

  async delPattern(pattern: string): Promise<void> {
    await cache.delPattern(pattern);
  }

  async increment(key: string, ttl?: number): Promise<number> {
    return cache.increment(key, ttl);
  }

  async remember<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number = 3600
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }
}