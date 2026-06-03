import dotenv from "dotenv";

dotenv.config();

const DB_Url = process.env.DATABASE_URL || "";
const Port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

if (!DB_Url) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}
export const env = { DB_Url, Port, JWT_SECRET };