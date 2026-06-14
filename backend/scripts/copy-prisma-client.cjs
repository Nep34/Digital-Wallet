const fs = require("node:fs");
const path = require("node:path");

const source = path.join(__dirname, "..", "src", "generated", "prisma");
const target = path.join(__dirname, "..", "dist", "generated", "prisma");

if (!fs.existsSync(source)) {
  throw new Error(`Prisma client was not generated at ${source}`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, { recursive: true });

console.log(`Copied Prisma client to ${target}`);
