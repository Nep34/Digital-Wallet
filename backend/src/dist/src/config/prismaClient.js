"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const env_1 = require("./env");
const adapter = new adapter_pg_1.PrismaPg({ connectionString: env_1.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
//# sourceMappingURL=prismaClient.js.map