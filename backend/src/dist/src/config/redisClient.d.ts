declare function getRedisValue(key: string): Promise<string | null>;
declare function setRedisValue(key: string, value: string, ttlSeconds: number): Promise<void>;
export { getRedisValue, setRedisValue };
//# sourceMappingURL=redisClient.d.ts.map