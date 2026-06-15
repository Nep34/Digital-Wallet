import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "";
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const Port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}
export const env = { DATABASE_URL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, Port, JWT_SECRET };