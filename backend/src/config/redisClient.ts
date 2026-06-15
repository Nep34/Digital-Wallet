import { Redis } from '@upstash/redis';
import { env } from './env';

const memoryStore = new Map<string, { value: string; expiresAt: number }>();

let redis: Redis | null = null;
let redisAvailable = false;

function getRedisInstance(): Redis | null {
  if (redis) return redis;

  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Upstash Redis credentials not set, falling back to in-memory cache.');
    return null;
  }

  try {
    redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });
    redisAvailable = true;
    return redis;
  } catch (error: any) {
    console.error('Failed to initialize Upstash Redis:', error?.message || error);
    return null;
  }
}

async function getRedisValue(key: string): Promise<string | null> {
  const client = getRedisInstance();
  if (client) {
    try {
      const value = await client.get<string>(key);
      return value ?? null;
    } catch (error: any) {
      console.error('Redis GET error, falling back to memory:', error?.message || error);
    }
  }

  // In-memory fallback
  const record = memoryStore.get(key);
  if (!record) return null;
  if (record.expiresAt <= Date.now()) {
    memoryStore.delete(key);
    return null;
  }
  return record.value;
}

async function setRedisValue(key: string, value: string, ttlSeconds: number): Promise<void> {
  const client = getRedisInstance();
  if (client) {
    try {
      await client.set(key, value, { ex: ttlSeconds });
      return;
    } catch (error: any) {
      console.error('Redis SET error, falling back to memory:', error?.message || error);
    }
  }

  // In-memory fallback
  memoryStore.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export { getRedisValue, setRedisValue };
