"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DATABASE_URL = process.env.DATABASE_URL || "";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const Port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}
exports.env = { DATABASE_URL, REDIS_URL, Port, JWT_SECRET };
//# sourceMappingURL=env.js.map