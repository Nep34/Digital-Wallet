"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisValue = getRedisValue;
exports.setRedisValue = setRedisValue;
const redis_1 = require("redis");
const env_1 = require("./env");
const redis = (0, redis_1.createClient)({ url: env_1.env.REDIS_URL });
const memoryStore = new Map();
let connectAttempt = null;
let redisAvailable = false;
async function ensureRedisConnection() {
    if (redisAvailable) {
        return true;
    }
    if (!connectAttempt) {
        connectAttempt = redis
            .connect()
            .then(() => {
            redisAvailable = true;
            return true;
        })
            .catch((error) => {
            redisAvailable = false;
            console.error('Redis unavailable, falling back to in-memory idempotency cache:', error?.message || error);
            return false;
        });
    }
    return connectAttempt;
}
async function getRedisValue(key) {
    const connected = await ensureRedisConnection();
    if (connected) {
        return redis.get(key);
    }
    const record = memoryStore.get(key);
    if (!record)
        return null;
    if (record.expiresAt <= Date.now()) {
        memoryStore.delete(key);
        return null;
    }
    return record.value;
}
async function setRedisValue(key, value, ttlSeconds) {
    const connected = await ensureRedisConnection();
    if (connected) {
        await redis.set(key, value, { EX: ttlSeconds });
        return;
    }
    memoryStore.set(key, {
        value,
        expiresAt: Date.now() + ttlSeconds * 1000,
    });
}
//# sourceMappingURL=redisClient.js.map