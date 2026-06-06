import { createClient } from 'redis';
import { env } from './env';

const redis = createClient({ url: env.REDIS_URL });
const memoryStore = new Map<string, { value: string; expiresAt: number }>();

let connectAttempt: Promise<boolean> | null = null;
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

async function getRedisValue(key: string) {
  const connected = await ensureRedisConnection();
  if (connected) {
    return redis.get(key);
  }

  const record = memoryStore.get(key);
  if (!record) return null;
  if (record.expiresAt <= Date.now()) {
    memoryStore.delete(key);
    return null;
  }
  return record.value;
}

async function setRedisValue(key: string, value: string, ttlSeconds: number) {
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

export { getRedisValue, setRedisValue };
