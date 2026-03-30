export declare class CacheService {
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    delPattern(pattern: string): Promise<void>;
    increment(key: string, ttl?: number): Promise<number>;
    remember<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T>;
}
//# sourceMappingURL=CacheService.d.ts.map