import { createClient } from 'redis';
import { envWithRedis } from './env';

const redisUrl = process.env.REDIS_URL || envWithRedis.REDIS_URL || 'redis://localhost:6379';

const client = createClient({ url: redisUrl });

client.on('error', (err) => console.error('Redis Client Error', err));

// Connect asynchronously; failures will be logged.
client.connect().catch((err) => console.error('Redis connection error:', err));

export default client;
