import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const Port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}
export const env = { DATABASE_URL, REDIS_URL, Port, JWT_SECRET };