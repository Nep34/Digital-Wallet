import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const Port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}
export const env = { DATABASE_URL, Port, JWT_SECRET };
export type Env = typeof env & { REDIS_URL: string };
export const envWithRedis: Env = { DATABASE_URL, Port, JWT_SECRET, REDIS_URL };